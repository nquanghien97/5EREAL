import React, { useState } from 'react'
import mapboxgl from 'mapbox-gl'

interface SuggestionsType {
  id: string
  type: string
  center: [number, number]
  place_name: string
}

function SearchMapbox({ mapRef }: { mapRef: React.RefObject<mapboxgl.Map | null> }): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMarker, setSearchMarker] = useState<mapboxgl.Marker | null>(null)
  const [suggestions, setSuggestions] = useState<SuggestionsType[]>([])
  const [isTyping, setIsTyping] = useState(false)


  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([])

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?autocomplete=true&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX}`
      )
      const data = await res.json()
      console.log('Suggestions:', data.features)
      setSuggestions(data.features)
    } catch (err) {
      console.error('Error fetching suggestions:', err)
      setSuggestions([])
    }
  }


  const handleSelectSuggestion = (feature: SuggestionsType) => {
    const [lng, lat] = feature.center
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 14 })

    // Xoá marker cũ
    searchMarker?.remove()

    // Marker mới
    const el = document.createElement('div')
    el.className = 'w-4 h-4 rounded-full border-2 border-white bg-green-500'

    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat([lng, lat])
      .addTo(mapRef.current!)

    // el.onclick = () => {
    //   setPopupInfo({ lat, lng, note: '' })
    // }

    setSearchMarker(marker)
    setSuggestions([])
    setSearchQuery(feature.place_name)
  }


  return (
    <div className="flex items-center mb-2 mx-6 gap-2">
      <p>Tìm kiếm</p>
      <div className="relative inline-block">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value
            setSearchQuery(value)
            setIsTyping(true)
            fetchSuggestions(value)
          }}

          placeholder="Tìm kiếm địa điểm..."
          className="px-3 py-1 border rounded shadow text-sm w-[250px]"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setTimeout(() => setIsTyping(false), 200)} // Delay để click được suggestion
        />
        {isTyping && suggestions.length > 0 && (
          <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow w-[250px] max-h-60 overflow-y-auto z-50">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(item)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchMapbox