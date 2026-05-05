import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { EVACUATION_CENTERS } from '@/lib/evacuation-data'
import { AlertCircle } from 'lucide-react'

interface UserLocation {
  lat: number
  lng: number
  timestamp: Date
}

const CebuLeafletMap: React.FC<{ onCenterSelect: (id: number) => void }> = ({ onCenterSelect }) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [nearbycenters, setNearbyCenters] = useState<typeof EVACUATION_CENTERS>([])
  const [locationError, setLocationError] = useState('')
  const mapRef = useRef(null)

  const CEBU_CENTER = [10.3157, 123.8854]
  const NEARBY_RADIUS_KM = 5

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date(),
          }
          setUserLocation(location)
          findNearbyCenters(location)
        },
        () => {
          setLocationError('Unable to get your location. Showing map of Cebu City.')
        }
      )

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date(),
          }
          setUserLocation(location)
          findNearbyCenters(location)
        },
        () => null,
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      )

      return () => navigator.geolocation.clearWatch(watchId)
    } else {
      setLocationError('Geolocation not supported in this browser')
    }
  }, [])

  const findNearbyCenters = (location: UserLocation) => {
    const nearby = EVACUATION_CENTERS.filter((center) => {
      const distance = calculateDistance(location.lat, location.lng, center.lat, center.lng)
      return distance <= NEARBY_RADIUS_KM
    }).sort((a, b) => {
      const distA = calculateDistance(location.lat, location.lng, a.lat, a.lng)
      const distB = calculateDistance(location.lat, location.lng, b.lat, b.lng)
      return distA - distB
    })

    setNearbyCenters(nearby)
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getMarkerColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe':
        return '#5B7E3C'
      case 'moderate':
        return '#A2CB8B'
      case 'high':
        return '#C44545'
      case 'flooded':
        return '#080616'
      default:
        return '#5B7E3C'
    }
  }

  const createCustomIcon = (riskLevel: string) => {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${getMarkerColor(riskLevel)};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-center;
          font-weight: bold;
          color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
          </svg>
        </div>
      `,
      className: 'custom-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })
  }

  return (
    <div className="h-full w-full flex flex-col">
      {locationError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
            <p className="text-sm text-yellow-700">{locationError}</p>
          </div>
        </div>
      )}

      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : CEBU_CENTER as any}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <Marker position={[userLocation.lat, userLocation.lng]} icon={L.icon({
              iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}>
              <Popup>Your Current Location</Popup>
            </Marker>

            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={NEARBY_RADIUS_KM * 1000}
              pathOptions={{ color: 'blue', fillOpacity: 0.1 }}
            />
          </>
        )}

        {EVACUATION_CENTERS.map((center) => (
          <Marker
            key={center.id}
            position={[center.lat, center.lng]}
            icon={createCustomIcon(center.riskLevel)}
            eventHandlers={{
              click: () => onCenterSelect(center.id),
            }}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-lg mb-2">{center.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{center.address}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="font-semibold">Capacity:</span> {center.capacity}
                  </div>
                  <div>
                    <span className="font-semibold">Occupancy:</span> {center.occupancy}
                  </div>
                  <div>
                    <span className="font-semibold">Risk:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded text-xs font-bold text-white`}
                      style={{ backgroundColor: getMarkerColor(center.riskLevel) }}
                    >
                      {center.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onCenterSelect(center.id)}
                  className="w-full bg-primary text-white text-sm py-1 rounded hover:bg-secondary transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {nearbycenters.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
          <p className="text-sm text-green-700 font-semibold mb-2">
            {nearbycenters.length} evacuation center(s) nearby ({NEARBY_RADIUS_KM} km)
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            {nearbycenters.slice(0, 3).map((center) => (
              <li key={center.id}>
                • {center.name} - {calculateDistance(userLocation!.lat, userLocation!.lng, center.lat, center.lng).toFixed(2)} km away
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CebuLeafletMap
