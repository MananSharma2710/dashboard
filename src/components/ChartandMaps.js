import React from 'react'
import CovidMap from './CovidMap'
import CovidDashboard from './CovidDashboard'

const ChartandMaps = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">COVID-19 Cases Over Time</h1>
      <CovidDashboard />
    </div>
  )
}

export default ChartandMaps