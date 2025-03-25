"use client";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Deposits", value: 1182, color: "#19C37D" },
  { name: "Withdrawals", value: 132, color: "#CF491E" },
];

export default function TransactionsChart() {
  const [mounted, setMounted] = useState(false)
  useEffect(()=>{
    setMounted(true)
  },[])
  const totalTransactions = data.reduce((acc, item) => acc + item.value, 0);
  if(!mounted) return null
  return (
    <div className="relative flex flex-col items-center">
      {/* PieChart Container */}
      <Formik
      initialValues={{filter : 'This Month'}}
      onSubmit={()=>{

      }}
      >
        <Form className="flex justify-end w-full mb-4">
          <Field as='select' className='cursor-pointer outline-none p-3 rounded-lg border border-gray-100'>
            <option value="This Month"> This Month</option>
          </Field>
        </Form>
      </Formik>
      <PieChart width={360} height={360}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={110}
          outerRadius={180}
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

      {/* Custom Centered Label */}
      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-man-rope">
        <p className="text-[1vw] text-black font-medium">Transaction count</p>
        <p className="text-[40px] font-extrabold mt-2">{totalTransactions}</p>
      </div>

      {/* Legend */}
      <div className="flex justify-between w-full mt-10">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <span className="w-[10.97vw] h-1" style={{ backgroundColor: item.color }}></span>
            <p>{item.name}</p>
            <p className="text-black font-extrabold text-[32px]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
