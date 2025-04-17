"use client"
import { axiosGet } from "@/utils/api";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


const TradeVolumeChart = () => {
  const [loading, setLoading] = useState(false)
  const [volumesData, setVolumesData] = useState<{month : number, total_volume : number}[]>([])
  const [filter, setFilter] = useState(String(new Date().getUTCFullYear()))
 
  useEffect(()=>{
    setLoading(true)
    const getMonthName = (monthNumber: number) => {
      const date = new Date(2020, monthNumber - 1);  // January is 0, so we subtract 1
      return date.toLocaleString('en-US', { month: 'short' });  // 'short' gives the abbreviated month
    };
    const getVolumes = async()=>{
      try {
        const res = await axiosGet(`/admin/trade-volume?year=${filter}`,true)
        const formattedData = res.trade_volume_by_month.map((item:{month : number, total_volume : string})=>({...item, month : getMonthName(item.month), total_volume : Number(item.total_volume)}))
        setVolumesData(()=>formattedData)
      } catch (error) {
        setLoading(false)
        toast.error('Error occured while fetching chart data')
      }finally{
        setLoading(false)
      }
    }
    getVolumes()
  },[filter])
  const highestTrade = volumesData?.reduce((max, d) => (d.total_volume > max.total_volume ? d : max), volumesData[0]);
  const averageTrade = (volumesData?.reduce((sum, d) => sum + d.total_volume, 0) / volumesData.length).toFixed(2);
  return (<>
  {
    loading ? (<div className="animate-pulse">
      {/* Chart Skeleton */}
      <div className="bg-gray-200 h-72 rounded-xl relative my-7">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      </div>
    </div>) : (<div className="p-6 bg-white rounded-lg mt-7">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Trade Volume Chart</h2>
        <select name="" id="" className="cursor-pointer p-2 border outline-none rounded-lg" value={filter} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setFilter(()=> (e.target.value))}>
          <option value={new Date().getUTCFullYear() - 1}>Last Year</option>
          <option value={new Date().getUTCFullYear()}>This Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={volumesData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3"  />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis label={{ 
              value: 'Trade Volume ($)', 
              angle: -90, 
              position: 'insideLeft', 
              offset: -20, 
              style: { fontSize: 12, textAnchor: 'middle' }
            }}  tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="total_volume" fill="#454ADE" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
      {
        volumesData.length > 0 ? (<div className="grid grid-cols-2 gap-4 mt-4">
          <div className="py-3 px-4 bg-white-200">
            <p className=" text-sm">
              In the month of <span className="font-bold text-pr2">{highestTrade?.month}</span>, users had the highest trade volume
              amounting to <span className="font-bold">${highestTrade?.total_volume.toLocaleString()}.</span>
            </p>
          </div>
          <div className="py-3 px-4 bg-white-200">
            <p className=" text-sm">
              The average trade amount was <span className="font-bold text-pr2">${parseFloat(averageTrade).toLocaleString()}.</span>
            </p>
          </div>
        </div>) : (<div>No data available for this year</div>)
      }
      
    </div>)
  }
  </>
  );
};

export default TradeVolumeChart;
