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
import SearchMapbox from './SearchMapbox'
import ReactDOM from 'react-dom/client'
import PopupContent from './PopupContent'
import SelectMarkerSaved from './SelectMarkerSaved'

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
    const root = ReactDOM.createRoot(container)
    root.render(
      <PopupContent
        coordinatesId={id}
        initialNote={initialNote}
        onSave={async (note) => {
          if (note !== initialNote) {
            labelEl.innerText = note.length > 30 ? note.slice(0, 30) + "…" : note || "(Chưa có ghi chú)"
            await UpdateCoordinates({ id, note })
            toast.success("Đã cập nhật ghi chú")
          }
          popup.remove()
        }}
        onDelete={async () => {
          marker.remove()
          markersRef.current = markersRef.current.filter(m => m.marker !== marker)
          await DeleteCoordinates({ id })
          toast.success("Đã xoá marker")
          popup.remove()
        }}
        onCancel={() => popup.remove()}
      />
    )

    return container
  }, [])

  const openPopupForNewMarker = React.useCallback((lat: number, lng: number) => {
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setLngLat([lng, lat])
      .addTo(mapRef.current!)

    const container = document.createElement('div')
    const root = ReactDOM.createRoot(container)

    root.render(
      <PopupContent
        isCreateNewMark
        coordinatesId={null}
        initialNote=""
        lat={lat}
        lng={lng}
        onSave={async (note) => {
          if (!note.trim()) return

          // gọi API lưu
          const result = await SaveCoordinates({ lat, lng, note })

          // tạo marker thật sự
          const { wrapper, label } = createCustomMarkerElement(note, '#EF4444')
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
        }}
        onDelete={() => {
          // marker mới chưa có id nên không cho xoá
          toast.error("Chưa lưu nên không thể xoá")
        }}
        onCancel={() => popup.remove()}
      />
    )

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
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F3E5A] mb-4 text-center uppercase">Xem và lưu thông tin BĐS của bạn</h2>
      <div className="flex justify-between container m-auto">
        <SearchMapbox mapRef={mapRef} />
        <SelectMarkerSaved listCoordinates={initCoordinates} mapRef={mapRef} />
      </div>
      <div
        ref={mapContainerRef}
        className="w-full h-[600px] rounded shadow"
      />
    </div>
  )
}

export default MapBox
