'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import Cebu3DMap from '@/components/cebu-3d-map';
import EvacuationCenterCard from '@/components/evacuation-center-card';
import { EVACUATION_CENTERS } from '@/lib/evacuation-data';

export default function MapPage() {
  const [selectedCenterId, setSelectedCenterId] = useState<string | undefined>();
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  const selectedCenter = selectedCenterId ? EVACUATION_CENTERS.find(c => c.id === selectedCenterId) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setShowMobilePanel(!showMobilePanel)} />

      <div className="flex h-[calc(100vh-65px)]">
        {/* 3D Map - Full width on mobile, left side on desktop */}
        <div className="flex-1 w-full md:w-2/3 relative">
          <Cebu3DMap
            selectedCenterId={selectedCenterId}
            onSelectCenter={setSelectedCenterId}
          />

          {/* Mobile floating center list button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-semibold shadow-lg"
            onClick={() => setShowMobilePanel(true)}
          >
            Centers List
          </motion.button>
        </div>

        {/* Side Panel - Details/List */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: showMobilePanel ? 0 : '100%', opacity: showMobilePanel ? 1 : 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed md:relative md:translate-x-0 right-0 top-0 w-full md:w-1/3 h-[calc(100vh-65px)] bg-white shadow-2xl md:shadow-lg z-30 md:z-auto overflow-hidden flex flex-col md:border-l border-border"
        >
          {/* Close button for mobile */}
          <button
            onClick={() => setShowMobilePanel(false)}
            className="md:hidden absolute top-4 right-4 bg-background hover:bg-secondary/20 p-2 rounded-lg z-40"
          >
            ✕
          </button>

          {selectedCenterId ? (
            <>
              {/* Details View */}
              <EvacuationCenterCard
                centerId={selectedCenterId}
                onClose={() => {
                  setSelectedCenterId(undefined);
                  setShowMobilePanel(false);
                }}
              />
            </>
          ) : (
            <>
              {/* Centers List View */}
              <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
                <h2 className="text-xl font-bold text-foreground">Evacuation Centers</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {EVACUATION_CENTERS.length} centers in Cebu City
                </p>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-border">
                  {EVACUATION_CENTERS.map((center, idx) => (
                    <motion.button
                      key={center.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => {
                        setSelectedCenterId(center.id);
                      }}
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

        {/* Mobile overlay backdrop */}
        {showMobilePanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobilePanel(false)}
            className="fixed inset-0 bg-black/30 md:hidden z-20"
          />
        )}
      </div>
    </div>
  );
}
