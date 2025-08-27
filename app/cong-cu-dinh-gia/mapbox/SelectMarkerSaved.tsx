'use client'

import dynamic from 'next/dynamic';
import React from 'react'
const Select = dynamic(() => import("react-select"), { ssr: false }) as typeof import("react-select").default<MarkerOption, false>

interface SelectMarkerSavedProps {
  listCoordinates: {
    id: number;
    lat: number;
    lng: number;
    note?: string;
  }[],
  mapRef: React.RefObject<mapboxgl.Map | null>
}

type MarkerOption = { label: string, value: string }

function SelectMarkerSaved(props : SelectMarkerSavedProps) {

  const { listCoordinates, mapRef } = props

  const options = listCoordinates.map(coord => ({
    label: coord.note && coord.note.length > 30
      ? coord.note.slice(0, 30) + '…'
      : (coord.note || `(Chưa có ghi chú) - [${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}]`),
    value: `${coord.lat},${coord.lng}`,
  }))

  const onChangeMarker = (selectedOption: MarkerOption | null) => {
    if (!selectedOption) return
    mapRef.current?.flyTo({
      center: [parseFloat(selectedOption.value.split(',')[1]), parseFloat(selectedOption.value.split(',')[0])],
      zoom: 14
    })
  }
  return (
    <div>
      <Select
        options={options}
        onChange={onChangeMarker}
        className="min-w-[320px]"
        placeholder="Chọn marker đã lưu"
      />
    </div>
  )
}

export default SelectMarkerSaved