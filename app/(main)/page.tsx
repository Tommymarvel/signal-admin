import Keyinsight from '@/components/dashboard/Keyinsight'
import TradeVolumeChart from '@/components/dashboard/TradeVolume'
import UserActivityChart from '@/components/dashboard/UserActivityChart'
import React from 'react'

const page = () => {
  return (
    <div className="my-5 mx-11">
    <Keyinsight/>
    <TradeVolumeChart/>
    <UserActivityChart/>
  </div>
  )
}

export default page
