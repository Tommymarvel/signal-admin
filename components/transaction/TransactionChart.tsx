"use client";
import { insightProps } from "@/app/(main)/transactions/page";
import { ChangeEvent, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Deposits", value: 1182, color: "#19C37D" },
  { name: "Withdrawals", value: 132, color: "#CF491E" },
];

export default function TransactionsChart({insights, handleFilter}:{insights : insightProps, handleFilter : (e:ChangeEvent<HTMLSelectElement>)=> void}) {
  const [mounted, setMounted] = useState(false)
  useEffect(()=>{
    setMounted(true)
  },[])
  const formattedInsights = [
    { name: "Deposits", value: insights.deposit_count, color: "#19C37D" },
    { name: "Withdrawals", value: insights.withdraw_count, color: "#CF491E" },
  ]
  const totalTransactions = formattedInsights.reduce((acc, item) => acc + item.value, 0);
  if(!mounted) return null
  return (
    <div className="relative flex flex-col items-center">
      {/* PieChart Container */}
      <select onChange={handleFilter} className='cursor-pointer outline-none p-3 rounded-lg border border-gray-100'>
        <option value={`month=${new Date().getMonth() + 1}`}> This Month</option>
        <option value={new Date().getMonth() - 1 <= 0 ? `year=${new Date().getFullYear() - 1}&month=${(new Date().getMonth() - 1) + 12}` : `month=${new Date().getMonth() - 1}`}> 2 Months ago</option>
      </select>
      <PieChart width={360} height={360}>
        <Pie
          data={formattedInsights}
          cx="50%"
          cy="50%"
          innerRadius={110}
          outerRadius={180}
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={true}
        >
          {formattedInsights.map((entry, index) => (
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
        {formattedInsights.map((item) => (
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
