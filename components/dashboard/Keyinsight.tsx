'use client'
import { insightProps } from "@/declarations/dashboard.declaration"
import { axiosGet } from "@/utils/api"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Keyinsight = () => {
    const [loading, setLoading] = useState(true)
    const [insightData, setInsightData] = useState({} as insightProps)
    useEffect(()=>{
        const getInsights = async()=>{
            try {
                const res = await axiosGet('/admin/trading-stats',true)
                setInsightData(res)
            } catch (error) {
                toast.error('got here')
            }finally{
                setLoading(false)
            }
        }
        getInsights()
    },[])
  return (<>
  {
    loading ? ( <div className="animate-pulse">
        {/* Key Insights Skeleton */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-300 h-20 rounded-xl"></div>
          ))}
        </div>
      </div>) : (<div className="p-6 rounded-[20px] bg-white font-man-rope">
        <header className="mb-6 text-black font-semibold text-[1.25vw]">
            Key Insights
        </header>
        <div>
            <p className="mb-5 font-medium text-xs text-gray-400">This month’s metrics</p>
            <div className="flex justify-between items-center w-[90%]">
                <Metric image="/dashboard/insight/totalTrx.svg" title="Total Transactions" value={`$${Number(insightData?.total_transactions.split(" ")[0]).toFixed(4)}`} />
                <Metric image="/dashboard/insight/activeTrade.svg" title="Active Trades" value={`${insightData.active_trades}`} />
                <Metric image="/dashboard/insight/newUser.svg" title="New User Registration" value={`${insightData.new_users_this_month}`} />
                <Metric image="/dashboard/insight/totalUsers.svg" title="Total Users" value={`${insightData.total_users}`} />
            </div>
        </div>
    </div>)
  }
  </>
  )
}

export default Keyinsight

const Metric = ({image, title, value,unit} : {image : string, title : string, value : string, unit ?: string})=>{
    return(<div className="font-man-rope flex items-center gap-3">
        <Image src={image} alt="" width={40} height={40}/>
        <div>
            <h6 className="text-xs text-gray-400 mb-1">{title}</h6>
            <p className="text-lg text-black font-semibold">{unit}{value}</p>
        </div>
    </div>)
}
