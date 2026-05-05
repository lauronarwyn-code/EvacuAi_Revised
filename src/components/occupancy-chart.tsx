'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EVACUATION_CENTERS } from '@/lib/evacuation-data';

export const OccupancyChart: React.FC = () => {
  const topCenters = EVACUATION_CENTERS
    .sort((a, b) => (b.currentOccupancy / b.capacity) - (a.currentOccupancy / a.capacity))
    .slice(0, 5);

  const maxOccupancy = Math.max(...topCenters.map(c => (c.currentOccupancy / c.capacity) * 100));

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm p-6">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Top Occupied Centers
      </h3>

      <div className="space-y-4">
        {topCenters.map((center, idx) => {
          const occupancyPercent = (center.currentOccupancy / center.capacity) * 100;
          const barHeight = (occupancyPercent / maxOccupancy) * 100;

          return (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-end justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm truncate">
                    {center.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {center.currentOccupancy} / {center.capacity}
                  </p>
                </div>
                <span className="font-bold text-sm ml-2" style={{
                  color: center.riskLevel === 'safe' ? '#5B7E3C' : 
                         center.riskLevel === 'moderate' ? '#A2CB8B' :
                         center.riskLevel === 'high' ? '#C44545' : '#080616'
                }}>
                  {occupancyPercent.toFixed(0)}%
                </span>
              </div>
              <div className="h-8 bg-border rounded-lg overflow-hidden">
                <motion.div
                  className="h-full rounded-lg transition-all"
                  style={{
                    backgroundColor: center.riskLevel === 'safe' ? '#5B7E3C' : 
                                   center.riskLevel === 'moderate' ? '#A2CB8B' :
                                   center.riskLevel === 'high' ? '#C44545' : '#080616'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${occupancyPercent}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OccupancyChart;
