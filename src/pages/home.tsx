import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Users, AlertTriangle, Shield } from 'lucide-react'
import { EVACUATION_CENTERS } from '@/lib/evacuation-data'
import { MetaTags } from '@/components/meta-tags'
import { organizationSchema } from '@/lib/seo'

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4">
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-3 rounded-lg">
        <Icon size={24} className="text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  </motion.div>
)

export default function HomePage() {
  const totalCapacity = EVACUATION_CENTERS.reduce((sum, c) => sum + c.capacity, 0)
  const totalOccupancy = EVACUATION_CENTERS.reduce((sum, c) => sum + c.currentOccupancy, 0)
  const highRiskCenters = EVACUATION_CENTERS.filter(c => c.riskLevel === 'high' || c.riskLevel === 'flooded').length

  return (
    <>
      <MetaTags
        title="EvacuAi - Real-Time Evacuation Site Mapping for Cebu City"
        description="EvacuAi provides real-time evacuation site mapping, capacity monitoring, and risk reporting for Cebu City, Philippines. Find safe evacuation centers with live updates and interactive 3D maps."
        keywords="evacuation centers, Cebu City, Philippines, emergency response, disaster management, real-time mapping, safety"
        url="https://evacuai.vercel.app/"
        jsonLd={organizationSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient-shift"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-8"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4"
                  >
                    Emergency Preparedness
                  </motion.div>
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4">
                    <span className="text-balance">
                      Real-time Evacuation
                      <br />
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Response System
                      </span>
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-lg">
                    EvacuAi provides real-time mapping and coordination of evacuation centers across Cebu City. Locate safe zones, check capacity, and report status instantly.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/map">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-4 rounded-lg flex items-center gap-2 hover:shadow-xl transition-shadow w-full sm:w-auto justify-center"
                    >
                      View Interactive Map
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-primary text-primary font-semibold px-8 py-4 rounded-lg hover:bg-primary/5 transition-colors w-full sm:w-auto"
                    >
                      Admin Dashboard
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Right Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-96 md:h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Animated circles */}
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border-2 border-primary/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute w-48 h-48 rounded-full border-2 border-secondary/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="relative z-10 text-center">
                    <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-3xl shadow-2xl">
                      <Shield size={64} className="text-white mx-auto" />
                    </div>
                    <p className="mt-6 font-semibold text-foreground">
                      {EVACUATION_CENTERS.length} Active Centers
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                System Overview
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real-time statistics from all evacuation centers across Cebu City
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={MapPin} label="Active Centers" value={EVACUATION_CENTERS.length} />
              <StatCard icon={Users} label="Total Capacity" value={totalCapacity.toLocaleString()} />
              <StatCard icon={Users} label="Current Occupancy" value={totalOccupancy.toLocaleString()} />
              <StatCard icon={AlertTriangle} label="High Risk Areas" value={highRiskCenters} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Key Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need for effective evacuation coordination
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: '3D Interactive Map',
                  description: 'Visualize all evacuation centers on an interactive 3D map with real-time risk indicators'
                },
                {
                  icon: AlertTriangle,
                  title: 'Risk Monitoring',
                  description: 'Instantly see the status of each center with color-coded risk levels and capacity info'
                },
                {
                  icon: Users,
                  title: 'Capacity Tracking',
                  description: 'Monitor occupancy levels across all centers to ensure balanced distribution'
                },
                {
                  icon: Shield,
                  title: 'Real-time Reporting',
                  description: 'Report and receive updates on evacuation center conditions and needs'
                },
                {
                  icon: Users,
                  title: 'Admin Dashboard',
                  description: 'Comprehensive management tools for emergency coordinators and officials'
                },
                {
                  icon: MapPin,
                  title: 'Location Services',
                  description: 'Get directions to the nearest evacuation center with contact information'
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg p-8 border border-border hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-3 rounded-lg w-fit mb-4 group-hover:shadow-md transition-all">
                    <feature.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Ensure Safety?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Access the real-time evacuation map to find the nearest safe zone and stay informed during emergencies.
              </p>
              <Link to="/map">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:shadow-xl transition-shadow"
                >
                  View Map Now
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-white py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={24} />
                  <span className="text-lg font-bold">EvacuAi</span>
                </div>
                <p className="text-white/70 text-sm">
                  Real-time evacuation response system for Cebu City
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><Link to="/map" className="hover:text-white transition-colors">Interactive Map</Link></li>
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-sm text-white/70">
                  Emergency: 911<br />
                  Cebu City Disaster Management: +63 32 412 0000
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
              <p>&copy; 2024 EvacuAi. All rights reserved. Cebu City Philippines.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
