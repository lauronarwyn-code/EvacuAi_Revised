'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EVACUATION_CENTERS, getRiskLevelColor, getRiskLevelLabel, type EvacuationCenter } from '@/lib/evacuation-data';
import { Users, MapPin, Phone, Shield, Users2, AlertCircle } from 'lucide-react';
import ReportStatusModal from './report-status-modal';

interface EvacuationCenterCardProps {
  centerId?: string;
  onClose?: () => void;
}

export const EvacuationCenterCard: React.FC<EvacuationCenterCardProps> = ({
  centerId,
  onClose
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const center = centerId ? EVACUATION_CENTERS.find(c => c.id === centerId) : null;

  if (!center) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          Select a center on the map to view details
        </p>
      </div>
    );
  }

  const occupancyPercent = (center.currentOccupancy / center.capacity) * 100;
  const riskColor = getRiskLevelColor(center.riskLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{center.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{center.barangay}, Cebu City</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Risk Level Badge */}
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: riskColor }}
          />
          <span className="font-semibold text-sm" style={{ color: riskColor }}>
            {getRiskLevelLabel(center.riskLevel)}
          </span>
          {center.riskLevel !== 'safe' && (
            <AlertCircle size={16} className="text-accent" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Occupancy Status */}
        <div>
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users2 size={18} />
            Occupancy Status
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Current: {center.currentOccupancy}</span>
                <span className="text-muted-foreground">Capacity: {center.capacity}</span>
              </div>
              <div className="h-3 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: riskColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${occupancyPercent}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {occupancyPercent.toFixed(1)}% capacity
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <MapPin size={18} />
            Location
          </h3>
          <p className="text-sm text-muted-foreground">{center.address}</p>
          <p className="text-xs text-muted-foreground mt-2">
            📍 {center.latitude.toFixed(4)}, {center.longitude.toFixed(4)}
          </p>
        </div>

        {/* Facility Type */}
        <div>
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield size={18} />
            Facility Type
          </h3>
          <p className="text-sm capitalize px-3 py-2 bg-secondary/20 rounded-lg text-foreground font-medium w-fit">
            {center.type.replace('-', ' ')}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Phone size={18} />
            Contact
          </h3>
          <a
            href={`tel:${center.contact}`}
            className="text-sm text-primary hover:underline font-medium"
          >
            {center.contact}
          </a>
        </div>

        {/* Features/Amenities */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {center.features.map((feature, idx) => (
              <div
                key={idx}
                className="text-xs bg-primary/10 text-primary px-3 py-2 rounded-lg font-medium"
              >
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 border-t border-border bg-secondary/5">
        <button 
          onClick={() => setShowReportModal(true)}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow"
        >
          Report Status
        </button>
      </div>

      {/* Report Modal */}
      <ReportStatusModal
        isOpen={showReportModal}
        centerName={center.name}
        centerId={center.id}
        onClose={() => setShowReportModal(false)}
      />
    </motion.div>
  );
};

export default EvacuationCenterCard;
