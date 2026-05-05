'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, MapPin } from 'lucide-react';

interface ReportStatusModalProps {
  isOpen: boolean;
  centerName?: string;
  centerId?: string;
  onClose: () => void;
}

export const ReportStatusModal: React.FC<ReportStatusModalProps> = ({
  isOpen,
  centerName,
  centerId,
  onClose
}) => {
  const [selectedRisk, setSelectedRisk] = useState<'safe' | 'moderate' | 'high' | 'flooded' | null>(null);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const riskOptions = [
    {
      id: 'safe',
      label: 'Safe',
      description: 'Center is functioning normally',
      color: '#5B7E3C',
      emoji: '✓'
    },
    {
      id: 'moderate',
      label: 'Moderate Risk',
      description: 'Some concerns but manageable',
      color: '#A2CB8B',
      emoji: '⚠'
    },
    {
      id: 'high',
      label: 'High Risk',
      description: 'Significant issues reported',
      color: '#C44545',
      emoji: '⚠'
    },
    {
      id: 'flooded',
      label: 'Flooded',
      description: 'Area is flooded/inaccessible',
      color: '#080616',
      emoji: '⛔'
    }
  ];

  const handleSubmit = () => {
    if (selectedRisk) {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSelectedRisk(null);
        setNotes('');
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-6 border-b border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Report Center Status</h2>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                      <MapPin size={16} />
                      {centerName || 'Evacuation Center'}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!submitted ? (
                  <div className="space-y-6">
                    {/* Status Selection */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <AlertCircle size={18} />
                        Select Current Status
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {riskOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedRisk(option.id as any)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                              selectedRisk === option.id
                                ? 'border-current bg-white shadow-lg'
                                : 'border-border hover:border-current'
                            }`}
                            style={{
                              borderColor: selectedRisk === option.id ? option.color : undefined,
                              backgroundColor:
                                selectedRisk === option.id ? `${option.color}10` : undefined
                            }}
                          >
                            <div className="text-2xl mb-2">{option.emoji}</div>
                            <p
                              className="font-semibold text-sm"
                              style={{ color: option.color }}
                            >
                              {option.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {option.description}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Notes Section */}
                    <div>
                      <label className="block font-semibold text-foreground mb-3">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Describe any specific issues, needs, or updates about this center..."
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Max 500 characters
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:bg-secondary/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!selectedRisk}
                        className={`flex-1 px-4 py-3 font-semibold rounded-lg text-white transition-all ${
                          selectedRisk
                            ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg cursor-pointer'
                            : 'bg-muted opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Submit Report
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2 }}
                      className="inline-block mb-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-3xl">✓</span>
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Report Submitted!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for updating the center status. This information will help emergency coordinators better manage resources.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReportStatusModal;
