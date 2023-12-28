import React from 'react'
import { PriceChart } from '../cmps/PriceChart'
import { LabelsChart } from '../cmps/LabelsChart'
import { PieChart } from '../cmps/PieChart'

export function ToyDashboard() {
  return (
    <div className='charts-container flex flex-column'>
      <PriceChart />
      <LabelsChart />
      <PieChart/>
    </div>
  )
}
