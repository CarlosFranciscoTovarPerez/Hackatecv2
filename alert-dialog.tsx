'use client'

import { cn } from '@/lib/utils'

interface AquaRiskIndicatorProps {
  score: number
  showFactors?: boolean
  factors?: {
    waterLevel?: number
    turbidity?: 'low' | 'medium' | 'high'
    chlorine?: 'low' | 'normal' | 'high'
    pressure?: 'low' | 'normal' | 'high'
  }
}

export function AquaRiskIndicator({ score, showFactors = false, factors }: AquaRiskIndicatorProps) {
  // Calculate the angle for the indicator (0-100 maps to 0-180 degrees)
  const angle = (score / 100) * 180
  
  // Determine color based on score
  const getColor = () => {
    if (score < 30) return { ring: 'stroke-success', text: 'text-success', bg: 'bg-success' }
    if (score < 50) return { ring: 'stroke-warning', text: 'text-warning', bg: 'bg-warning' }
    if (score < 70) return { ring: 'stroke-danger', text: 'text-danger', bg: 'bg-danger' }
    return { ring: 'stroke-destructive', text: 'text-destructive', bg: 'bg-destructive' }
  }

  const getLabel = () => {
    if (score < 30) return 'Bajo'
    if (score < 50) return 'Moderado'
    if (score < 70) return 'Alto'
    return 'Critico'
  }

  const colors = getColor()

  // Calculate stroke dasharray for the progress arc
  // The arc length is approximately 283 units (half circle with radius 90)
  const circumference = Math.PI * 90 // half circumference
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-32">
        {/* Background arc */}
        <svg 
          viewBox="0 0 200 110" 
          className="w-full h-full"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.65 0.17 165)" />
              <stop offset="50%" stopColor="oklch(0.8 0.16 85)" />
              <stop offset="100%" stopColor="oklch(0.63 0.24 25)" />
            </linearGradient>
          </defs>

          {/* Gray background arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="18"
            strokeLinecap="round"
            className="text-muted"
          />
          
          {/* Colored progress arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            strokeWidth="18"
            strokeLinecap="round"
            className={colors.ring}
            strokeDasharray={strokeDasharray}
            style={{
              transition: 'stroke-dasharray 0.5s ease-in-out'
            }}
          />

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const tickAngle = (180 - (tick / 100) * 180) * (Math.PI / 180)
            const innerRadius = 70
            const outerRadius = 76
            const x1 = 100 + innerRadius * Math.cos(tickAngle)
            const y1 = 100 - innerRadius * Math.sin(tickAngle)
            const x2 = 100 + outerRadius * Math.cos(tickAngle)
            const y2 = 100 - outerRadius * Math.sin(tickAngle)
            
            return (
              <line
                key={tick}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground/50"
              />
            )
          })}

          {/* Center decorative circle */}
          <circle 
            cx="100" 
            cy="100" 
            r="8" 
            className={cn('transition-colors duration-300', colors.bg)}
          />
          <circle cx="100" cy="100" r="5" className="fill-background" />

          {/* Needle */}
          <g style={{ 
            transform: `rotate(${180 - angle}deg)`,
            transformOrigin: '100px 100px',
            transition: 'transform 0.5s ease-in-out'
          }}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-foreground"
            />
            <polygon
              points="96,35 104,35 100,20"
              className="fill-foreground"
            />
          </g>

          {/* Labels */}
          <text x="20" y="105" className="text-[9px] fill-success font-medium">0</text>
          <text x="48" y="55" className="text-[9px] fill-warning font-medium">25</text>
          <text x="95" y="35" className="text-[9px] fill-warning font-medium">50</text>
          <text x="142" y="55" className="text-[9px] fill-danger font-medium">75</text>
          <text x="170" y="105" className="text-[9px] fill-destructive font-medium">100</text>
        </svg>
      </div>

      <div className="text-center -mt-2">
        <p className={cn('text-4xl font-bold transition-colors', colors.text)}>{score}/100</p>
        <p className={cn('text-sm font-semibold mt-1 transition-colors', colors.text)}>
          Riesgo {getLabel()}
        </p>
      </div>

      {/* Risk factors breakdown */}
      {showFactors && factors && (
        <div className="w-full mt-4 pt-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-3 text-center">Desglose de factores</p>
          <div className="grid grid-cols-2 gap-2">
            {factors.waterLevel !== undefined && (
              <FactorBar 
                label="Nivel de agua" 
                value={100 - factors.waterLevel} 
                maxValue={100}
              />
            )}
            {factors.turbidity && (
              <FactorBar 
                label="Turbidez" 
                value={factors.turbidity === 'high' ? 80 : factors.turbidity === 'medium' ? 50 : 20} 
                maxValue={100}
              />
            )}
            {factors.chlorine && (
              <FactorBar 
                label="Cloro" 
                value={factors.chlorine === 'low' ? 70 : factors.chlorine === 'high' ? 40 : 10} 
                maxValue={100}
              />
            )}
            {factors.pressure && (
              <FactorBar 
                label="Presion" 
                value={factors.pressure === 'low' ? 60 : factors.pressure === 'high' ? 30 : 10} 
                maxValue={100}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function FactorBar({ label, value, maxValue }: { label: string; value: number; maxValue: number }) {
  const percentage = (value / maxValue) * 100
  const getBarColor = () => {
    if (percentage < 30) return 'bg-success'
    if (percentage < 50) return 'bg-warning'
    if (percentage < 70) return 'bg-danger'
    return 'bg-destructive'
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn('h-full rounded-full transition-all duration-500', getBarColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
