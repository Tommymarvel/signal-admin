"use client"
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
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
  return (
    <div className="p-6 bg-white rounded-lg mt-7 font-man-rope">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Activity Chart</h2>
        <Formik
        initialValues={{timeframe : 'Last 2 weeks'}}
        onSubmit={()=>{

        }}
        >
            <Form>
                <Field as="select" name="timeframe" >
                    <option value="Last 2 weeks">Last Year</option>
                    <option value="Last month">This Year</option>
                </Field>
            </Form>
        </Formik>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
            <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.2} />
                </linearGradient>
          </defs>
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={5} tick={{ fontSize: 12, dx: 25 }}/>
          <YAxis label={{ value: 'Users', angle: -90, offset : -20, position: 'insideLeft',style: { fontSize: 12, textAnchor: 'middle' } }} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="users" stroke="#17BC2E" fill="url(#colorUsers)" strokeWidth={4} fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
