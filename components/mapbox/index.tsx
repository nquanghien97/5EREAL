'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { toast } from 'react-toastify'
import {
  SaveCoordinates,
  UpdateCoordinates,
  DeleteCoordinates
} from '@/services/coordinates/coordinates'
import { calcDistance } from '@/utils/calcDistance'

interface MapBoxProps {
  initCoordinates: {
    id: number
    lat: number
    lng: number
    note?: string
  }[]
}

function MapBox({ initCoordinates }: MapBoxProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<{ marker: mapboxgl.Marker; id: number }[]>([])

  const getDistanceThresholdByZoom = (zoom: number): number => {
    if (zoom >= 14) return 100
    if (zoom >= 11) return 300
    return 800
  }

  const createCustomMarkerElement = useCallback((note: string, color = '#EF4444') => {
    const wrapper = document.createElement('div')
    wrapper.className = 'flex flex-col items-center'

    const label = document.createElement('div')
    label.className =
      'mb-1 max-w-[120px] px-2 py-1 text-xs bg-white text-black border border-gray-300 rounded shadow whitespace-nowrap text-center'
    label.innerText =
      note?.length > 30 ? note.slice(0, 30) + '…' : note || '(Chưa có ghi chú)'
    wrapper.appendChild(label)

    const icon = document.createElement('div')
    icon.className = 'w-4 h-4 rounded-full shadow-md border-2 border-white'
    icon.style.backgroundColor = color
    wrapper.appendChild(icon)

    return { wrapper, label }
  }, [])

  const createPopupContent = useCallback((
    id: number,
    labelEl: HTMLElement,
    marker: mapboxgl.Marker,
    popup: mapboxgl.Popup,
    initialNote: string
  ) => {
    const container = document.createElement('div')
    container.className = 'p-2 space-y-2'

    const textarea = document.createElement('textarea')
    textarea.className =
      'p-2 border rounded-md text-sm text-gray-700'
    textarea.value = initialNote
    container.appendChild(textarea)

    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'flex justify-between space-x-2'

    const saveBtn = document.createElement('button')
    saveBtn.className =
      'px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded'
    saveBtn.innerText = 'Lưu'
    saveBtn.onclick = async () => {
      const note = textarea.value.trim()
      if (note !== initialNote) {
        labelEl.innerText =
          note.length > 30 ? note.slice(0, 30) + '…' : note || '(Chưa có ghi chú)'
        await UpdateCoordinates({ id, note })
        toast.success('Đã cập nhật ghi chú')
      }
      popup.remove()
    }

    const deleteBtn = document.createElement('button')
    deleteBtn.className =
      'px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded'
    deleteBtn.innerText = 'Xoá'
    deleteBtn.onclick = async () => {
      marker.remove()
      markersRef.current = markersRef.current.filter(m => m.marker !== marker)
      await DeleteCoordinates({ id })
      toast.success('Đã xoá marker')
    }

    btnWrapper.appendChild(saveBtn)
    btnWrapper.appendChild(deleteBtn)
    container.appendChild(btnWrapper)

    return container
  }, [])

  const openPopupForNewMarker = React.useCallback((lat: number, lng: number) => {
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setLngLat([lng, lat])
      .addTo(mapRef.current!)

    const container = document.createElement('div')
    container.className = 'p-2 space-y-2'

    const textarea = document.createElement('textarea')
    textarea.className =
      'p-2 border rounded-md text-sm text-gray-700'
    container.appendChild(textarea)

    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'flex justify-between space-x-2'

    const saveBtn = document.createElement('button')
    saveBtn.className =
      'px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded'
    saveBtn.innerText = 'Lưu'
    saveBtn.onclick = async () => {
      const note = textarea.value.trim()
      if (!note) return

      const result = await SaveCoordinates({ lat, lng, note })

      const { wrapper, label } = createCustomMarkerElement(note)
      const realPopup = new mapboxgl.Popup({ offset: 25 })

      const newMarker = new mapboxgl.Marker({ element: wrapper })
        .setLngLat([lng, lat])
        .setPopup(realPopup)
        .addTo(mapRef.current!)

      const popupContent = createPopupContent(result.data.id, label, newMarker, realPopup, note)
      realPopup.setDOMContent(popupContent)

      markersRef.current.push({ marker: newMarker, id: result.data.id })
      toast.success('Đã thêm marker mới')
      popup.remove()
    }

    const cancelBtn = document.createElement('button')
    cancelBtn.className =
      'px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded'
    cancelBtn.innerText = 'Hủy'
    cancelBtn.onclick = () => popup.remove()

    btnWrapper.appendChild(saveBtn)
    btnWrapper.appendChild(cancelBtn)
    container.appendChild(btnWrapper)

    popup.setDOMContent(container)
  }, [createCustomMarkerElement, createPopupContent, markersRef, mapRef])

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX as string

    if (!mapContainerRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [105.85, 21.02],
      zoom: 12
    })

    initCoordinates.forEach(({ id, lat, lng, note = '' }) => {
      const { wrapper, label } = createCustomMarkerElement(note, '#3B82F6')
      const popup = new mapboxgl.Popup({ offset: 25 })

      const marker = new mapboxgl.Marker({ element: wrapper })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current!)

      const popupContent = createPopupContent(id, label, marker, popup, note)
      popup.setDOMContent(popupContent)

      markersRef.current.push({ marker, id })
    })

    mapRef.current.on('click', async (e) => {
      const [lng, lat] = [e.lngLat.lng, e.lngLat.lat]
      const zoom = mapRef.current?.getZoom() || 10
      const threshold = getDistanceThresholdByZoom(zoom)

      for (const { marker } of markersRef.current) {
        const mLngLat = marker.getLngLat()
        const distance = calcDistance([mLngLat.lng, mLngLat.lat], [lng, lat])
        if (distance < threshold) {
          marker.togglePopup()
          return
        }
      }

      openPopupForNewMarker(lat, lng)
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [createCustomMarkerElement, createPopupContent, initCoordinates, openPopupForNewMarker])

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[600px] rounded shadow"
    />
  )
}

export default MapBox
