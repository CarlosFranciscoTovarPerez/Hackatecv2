'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface AlertsChartProps {
  data: { type: string; count: number }[]
}

const COLORS = [
  'oklch(0.63 0.24 25)',   // destructive - Nivel bajo
  'oklch(0.75 0.18 50)',   // danger - Turbidez
  'oklch(0.8 0.16 85)',    // warning - Cloro bajo
  'oklch(0.65 0.19 220)',  // primary - Presión baja
  'oklch(0.65 0.17 165)',  // secondary - Reporte ciudadano
]

export function AlertsChart({ data }: AlertsChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
          <XAxis 
            dataKey="type" 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'oklch(var(--card))',
              border: '1px solid oklch(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ color: 'oklch(var(--foreground))' }}
            formatter={(value: number) => [value, 'Alertas']}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
