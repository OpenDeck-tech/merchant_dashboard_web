'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface RevenueData {
  date: string
  revenue: number
}

export default function RevenueChart({ data }: { data: RevenueData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          }}
        />
        <YAxis
          tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value: number) => [
            `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            'Revenue',
          ]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ fill: '#0ea5e9', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

