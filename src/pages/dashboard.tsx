import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { EVACUATION_CENTERS } from '@/lib/evacuation-data'
import { MetaTags } from '@/components/meta-tags'
import {
  AlertTriangle,
  Activity,
  CheckCircle,
  Zap,
  MapPin
} from 'lucide-react'

type RiskLevel = 'safe' | 'moderate' | 'high' | 'flooded'

export default function DashboardPage() {
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all')

  const filteredCenters = riskFilter === 'all'
    ? EVACUATION_CENTERS
    : EVACUATION_CENTERS.filter(c => c.riskLevel === riskFilter)

  const totalCapacity = EVACUATION_CENTERS.reduce((sum, c) => sum + c.capacity, 0)
  const totalOccupancy = EVACUATION_CENTERS.reduce((sum, c) => sum + c.currentOccupancy, 0)
  const occupancyPercent = (totalOccupancy / totalCapacity) * 100

  const stats = [
    {
      icon: MapPin,
      label: 'Total Centers',
      value: EVACUATION_CENTERS.length,
      color: 'from-primary to-secondary'
    },
    {
      icon: Activity,
      label: 'Avg Occupancy',
      value: `${occupancyPercent.toFixed(1)}%`,
      color: 'from-secondary to-accent'
    },
    {
      icon: AlertTriangle,
      label: 'High Risk Areas',
      value: EVACUATION_CENTERS.filter(c => c.riskLevel === 'high' || c.riskLevel === 'flooded').length,
      color: 'from-accent to-red-600'
    },
    {
      icon: CheckCircle,
      label: 'Safe Centers',
      value: EVACUATION_CENTERS.filter(c => c.riskLevel === 'safe').length,
      color: 'from-primary to-green-600'
    }
  ]

  return (
    <>
      <MetaTags
        title="Admin Dashboard - EvacuAi | Evacuation Center Management"
        description="Admin dashboard for managing evacuation centers in Cebu City. Monitor real-time capacity, risk levels, and system status."
        keywords="evacuation management, Cebu admin, emergency coordination, real-time monitoring"
        url="https://evacuai.vercel.app/dashboard"
      />

      <div className="min-h-screen bg-background">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring and management of evacuation centers
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} text-white rounded-lg p-6 shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <stat.icon size={32} className="opacity-50" />
                </div>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/40"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Centers Table */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg border border-border shadow-sm"
              >
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Evacuation Centers</h2>
                    <p className="text-sm text-muted-foreground">
                      {filteredCenters.length} centers displayed
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRiskFilter('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        riskFilter === 'all'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground hover:bg-secondary/20'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setRiskFilter('safe')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        riskFilter === 'safe'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground hover:bg-secondary/20'
                      }`}
                    >
                      Safe
                    </button>
                    <button
                      onClick={() => setRiskFilter('high')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        riskFilter === 'high'
                          ? 'bg-accent text-white'
                          : 'bg-muted text-foreground hover:bg-secondary/20'
                      }`}
                    >
                      High Risk
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/10 border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                          Barangay
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                          Occupancy
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredCenters.map((center, idx) => {
                        const occupancyPct = (center.currentOccupancy / center.capacity) * 100
                        return (
                          <motion.tr
                            key={center.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="hover:bg-secondary/5 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <p className="font-semibold text-foreground">{center.name}</p>
                              <p className="text-xs text-muted-foreground">{center.type}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-foreground">
                              {center.barangay}
                            </td>
                            <td className="px-6 py-4">
                              <div className="w-32">
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-foreground">
                                    {center.currentOccupancy}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {occupancyPct.toFixed(0)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-border rounded-full overflow-hidden">
                                  <motion.div
                                    className={`h-full ${
                                      center.riskLevel === 'safe'
                                        ? 'bg-primary'
                                        : center.riskLevel === 'moderate'
                                          ? 'bg-secondary'
                                          : 'bg-accent'
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${occupancyPct}%` }}
                                    transition={{ duration: 1 }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  center.riskLevel === 'safe'
                                    ? 'bg-primary/20 text-primary'
                                    : center.riskLevel === 'moderate'
                                      ? 'bg-secondary/20 text-secondary'
                                      : center.riskLevel === 'high'
                                        ? 'bg-accent/20 text-accent'
                                        : 'bg-foreground/20 text-foreground'
                                }`}
                              >
                                {center.riskLevel === 'safe'
                                  ? '✓ Safe'
                                  : center.riskLevel === 'moderate'
                                    ? '⚠ Moderate'
                                    : center.riskLevel === 'high'
                                      ? '⚠ High Risk'
                                      : '⛔ Flooded'}
                              </span>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg border border-border shadow-sm p-6"
              >
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-accent" />
                  System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">API Status</span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Updated</span>
                    <span className="text-xs font-semibold text-foreground">Just now</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="text-xs font-semibold text-primary">99.9%</span>
                  </div>
                </div>
              </motion.div>

              {/* Risk Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg border border-border shadow-sm p-6"
              >
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-accent" />
                  Risk Distribution
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: 'Safe',
                      count: EVACUATION_CENTERS.filter(c => c.riskLevel === 'safe').length,
                      color: '#5B7E3C'
                    },
                    {
                      label: 'Moderate',
                      count: EVACUATION_CENTERS.filter(c => c.riskLevel === 'moderate').length,
                      color: '#A2CB8B'
                    },
                    {
                      label: 'High Risk',
                      count: EVACUATION_CENTERS.filter(c => c.riskLevel === 'high').length,
                      color: '#C44545'
                    },
                    {
                      label: 'Flooded',
                      count: EVACUATION_CENTERS.filter(c => c.riskLevel === 'flooded').length,
                      color: '#080616'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </div>
                      <span className="font-semibold text-foreground">{item.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20 p-6"
              >
                <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-shadow text-sm">
                    Generate Report
                  </button>
                  <button className="w-full border-2 border-primary text-primary font-semibold py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm">
                    Broadcast Alert
                  </button>
                  <button className="w-full border-2 border-primary text-primary font-semibold py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm">
                    Export Data
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
