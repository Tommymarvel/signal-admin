"use client"
import { axiosGet } from "@/utils/api";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", volume: 600000 },
  { month: "Feb", volume: 620000 },
  { month: "Mar", volume: 750000 },
  { month: "Apr", volume: 870000 },
  { month: "May", volume: 1100000 },
  { month: "June", volume: 400000 },
  { month: "July", volume: 500000 },
  { month: "Aug", volume: 750000 },
  { month: "Sep", volume: 900000 },
  { month: "Oct", volume: 200000 },
  { month: "Nov", volume: 300000 },
  { month: "Dec", volume: 800000 }
];

const highestTrade = data.reduce((max, d) => (d.volume > max.volume ? d : max), data[0]);
const averageTrade = (data.reduce((sum, d) => sum + d.volume, 0) / data.length).toFixed(2);

const TradeVolumeChart = () => {
  const [loading, setLoading] = useState(true)
  const [volumesData, setVolumesData] = useState({})
  useEffect(()=>{
    const getVolumes = async()=>{
      try {
        const res = await axiosGet('/admin/user-activity?year=2025',true)
        setVolumesData(res)
      } catch (error) {
        toast.error('Error occured while fetching chart data')
      }finally{
        setLoading(false)
      }
    }
    getVolumes()
  },[])
  return (<>
  {
    loading ? (<div className="animate-pulse">
      {/* Chart Skeleton */}
      <div className="bg-gray-200 h-72 rounded-xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      </div>
    </div>) : (<div className="p-6 bg-white rounded-lg mt-7">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Trade Volume Chart</h2>
        <Formik
        initialValues={{year : 'Last year'}}
        onSubmit={()=>{

        }}
         >
            <Form>
                <Field as="select" name="year" >
                    <option value="Last year">Last Year</option>
                    <option value="This Year">This Year</option>
                </Field>
            </Form>
        </Formik>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
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
          <Bar dataKey="volume" fill="#454ADE" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="py-3 px-4 bg-white-200">
          <p className=" text-sm">
            In the month of <span className="font-bold text-pr2">{highestTrade.month}</span>, users had the highest trade volume
            amounting to <span className="font-bold">${highestTrade.volume.toLocaleString()}.</span>
          </p>
        </div>
        <div className="py-3 px-4 bg-white-200">
          <p className=" text-sm">
            The average trade amount was <span className="font-bold text-pr2">${parseFloat(averageTrade).toLocaleString()}.</span>
          </p>
        </div>
      </div>
    </div>)
  }
  </>
  );
};

export default TradeVolumeChart;
