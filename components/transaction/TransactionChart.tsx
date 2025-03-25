"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Deposits", value: 1182, color: "#00B26D" },
  { name: "Withdrawals", value: 132, color: "#C0392B" },
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-3xl font-bold">{totalTransactions}</p>
        <p className="text-sm text-gray-500">Transaction count</p>
      </div>

      {/* Legend */}
      <div className="flex justify-between w-full mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-4 h-1" style={{ backgroundColor: item.color }}></span>
            <p>{item.name}: <strong>{item.value}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}
