"use client"
import { axiosGet } from "@/utils/api";
import { Field, Form, Formik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", users: 400000 },
  { day: "Tue", users: 450000 },
  { day: "Wed", users: 700000 },
  { day: "Thu", users: 650000 },
  { day: "Fri", users: 600000 },
  { day: "Sat", users: 500000 },
  { day: "Sun", users: 300000 },
  { day: "Mon", users: 320000 },
  { day: "Tue", users: 480000 },
  { day: "Wed", users: 700000 },
  { day: "Thu", users: 900000 },
  { day: "Fri", users: 650000 }
];

const UserActivityChart = () => {
  const [loading, setLoading] = useState(false)
  const [userActivity, setUserActivity] = useState<{week : string, "new user" : number}[]>([])
  const [filter, setFilter] = useState(String(new Date().getUTCFullYear()))
  useEffect(()=>{
    const getActivity = async()=>{
      try {
        setLoading(true)
        const res = await axiosGet(`/admin/user-activity?year=${filter}`,true)
        const formattedData = res.user_activity_by_week.map((item : {week : number, new_users : number})=>({week : `w-${item.week}`, "new users" : item.new_users}))
        setUserActivity(formattedData)
      } catch (error) {
        toast.error('Error occured while fetching user chart data')
      }finally{
        setLoading(false)
      }
    }
    getActivity()
  },[filter])
  return (<>
  {
    loading ? (<div className="animate-pulse">
      <div className="bg-white h-72  relative mt-7 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      </div>
    </div>)  :(<div className="p-6 bg-white rounded-lg mt-7 font-man-rope">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Activity Chart</h2>
        <select name="" id="" className="cursor-pointer p-2 border outline-none rounded-lg" value={filter} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setFilter(()=> (e.target.value))}>
          <option value={new Date().getUTCFullYear() - 1}>Last Year</option>
          <option value={new Date().getUTCFullYear()}>This Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={userActivity} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
            <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.2} />
                </linearGradient>
          </defs>
          <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={5} tick={{ fontSize: 12, dx: 5 }}/>
          <YAxis label={{ value: 'Users', angle: -90, offset : -10, position: 'insideLeft',style: { fontSize: 12, textAnchor: 'middle' } }} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="new users" stroke="#17BC2E" fill="url(#colorUsers)" strokeWidth={4} fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>)
  }
  </>);
};

export default UserActivityChart;
