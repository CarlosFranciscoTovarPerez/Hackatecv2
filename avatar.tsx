'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface WaterLevelChartProps {
  data: { day: string; level: number }[]
}

export function WaterLevelChart({ data }: WaterLevelChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.65 0.19 220)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="oklch(0.65 0.19 220)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'oklch(var(--card))',
              border: '1px solid oklch(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ color: 'oklch(var(--foreground))' }}
            formatter={(value: number) => [`${value}%`, 'Nivel']}
          />
          <Area 
            type="monotone" 
            dataKey="level" 
            stroke="oklch(0.65 0.19 220)" 
            strokeWidth={2}
            fill="url(#waterGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
