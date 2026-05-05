import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Cebu3DMap from '@/components/cebu-3d-map'
import EvacuationCenterCard from '@/components/evacuation-center-card'
import { EVACUATION_CENTERS } from '@/lib/evacuation-data'
import { MetaTags } from '@/components/meta-tags'

export default function MapPage() {
  const [selectedCenterId, setSelectedCenterId] = useState<string | undefined>()
  const [showMobilePanel, setShowMobilePanel] = useState(false)

  const selectedCenter = selectedCenterId
    ? EVACUATION_CENTERS.find(c => c.id === selectedCenterId)
    : null

  return (
    <>
      <MetaTags
        title="Interactive Evacuation Map - EvacuAi | Cebu City"
        description="Interactive 3D map of evacuation centers in Cebu City with real-time status, capacity information, and location details for emergency response."
        keywords="Cebu evacuation map, emergency centers, real-time mapping, Cebu disaster response"
        url="https://evacuai.vercel.app/map"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Map",
          "name": "Evacuation Centers Map - Cebu City",
          "description": "Interactive 3D map showing all evacuation centers in Cebu City with real-time status information",
          "geo": {
            "@type": "GeoShape",
            "box": "10.2895 123.8854 10.3500 123.9500"
          }
        }}
      />

      {/* FULL SCREEN MAP LAYOUT */}
      <div className="h-screen w-full flex overflow-hidden">

        {/* MAP AREA */}
        <div className="flex-1 relative">
          <Cebu3DMap
            selectedCenterId={selectedCenterId}
            onSelectCenter={setSelectedCenterId}
          />

          {/* Mobile floating button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-semibold shadow-lg z-10"
            onClick={() => setShowMobilePanel(true)}
          >
            Centers List
          </motion.button>
        </div>

        {/* SIDE PANEL */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: showMobilePanel ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed md:relative right-0 top-0 h-screen w-full md:w-1/3 bg-white shadow-2xl md:shadow-lg z-30 flex flex-col border-l border-border"
        >

          {/* Close button (mobile only) */}
          <button
            onClick={() => setShowMobilePanel(false)}
            className="md:hidden absolute top-4 right-4 bg-background hover:bg-secondary/20 p-2 rounded-lg z-40"
          >
            ✕
          </button>

          {/* DETAILS VIEW */}
          {selectedCenterId ? (
            <EvacuationCenterCard
              centerId={selectedCenterId}
              onClose={() => {
                setSelectedCenterId(undefined)
                setShowMobilePanel(false)
              }}
            />
          ) : (
            <>
              {/* HEADER */}
              <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
                <h2 className="text-xl font-bold text-foreground">
                  Evacuation Centers
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {EVACUATION_CENTERS.length} centers in Cebu City
                </p>
              </div>

              {/* LIST */}
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-border">
                  {EVACUATION_CENTERS.map((center, idx) => (
                    <motion.button
                      key={center.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedCenterId(center.id)}
                      className="w-full px-6 py-4 hover:bg-secondary/10 transition-colors text-left border-l-4 border-transparent hover:border-primary"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">
                            {center.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {center.barangay} • {center.type.replace('-', ' ')}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                center.riskLevel === 'safe'
                                  ? '#5B7E3C'
                                  : center.riskLevel === 'moderate'
                                    ? '#A2CB8B'
                                    : center.riskLevel === 'high'
                                      ? '#C44545'
                                      : '#080616'
                            }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {center.currentOccupancy}/{center.capacity}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* BACKDROP */}
        {showMobilePanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowMobilePanel(false)}
            className="fixed inset-0 bg-black/30 md:hidden z-20"
          />
        )}
      </div>
    </>
  )
}