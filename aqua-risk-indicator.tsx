'use client'

import { use } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft,
  Droplets,
  Gauge,
  Thermometer,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  History,
  Waves,
  FlaskConical,
  Wifi,
  WifiOff,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { waterPoints, alerts, getRiskColor, getStatusLabel } from '@/lib/data'
import { AquaRiskIndicator } from '@/components/aqua-risk-indicator'
import { cn } from '@/lib/utils'

interface PointDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PointDetailPage({ params }: PointDetailPageProps) {
  const { id } = use(params)
  const point = waterPoints.find(p => p.id === id)
  
  if (!point) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Droplets className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Punto no encontrado</h2>
        <p className="text-muted-foreground mb-4">El punto de agua solicitado no existe.</p>
        <Link href="/dashboard/map">
          <Button>Volver al mapa</Button>
        </Link>
      </div>
    )
  }

  const pointAlerts = alerts.filter(a => a.pointId === point.id)
  const isOnline = point.status !== 'offline'

  const getMetricStatus = (value: 'low' | 'normal' | 'high' | 'medium', inverted = false) => {
    if (value === 'normal') return { color: 'text-success', bg: 'bg-success/10', icon: CheckCircle }
    if (value === 'low') return inverted 
      ? { color: 'text-success', bg: 'bg-success/10', icon: TrendingDown }
      : { color: 'text-warning', bg: 'bg-warning/10', icon: TrendingDown }
    if (value === 'high') return inverted
      ? { color: 'text-warning', bg: 'bg-warning/10', icon: TrendingUp }
      : { color: 'text-success', bg: 'bg-success/10', icon: TrendingUp }
    return { color: 'text-warning', bg: 'bg-warning/10', icon: Minus }
  }

  const metrics = [
    { 
      label: 'Nivel del deposito', 
      value: `${point.waterLevel}%`, 
      icon: Waves,
      status: point.waterLevel < 30 ? 'low' : point.waterLevel > 70 ? 'high' : 'normal',
      trend: point.waterLevel < 30 ? 'critical' : point.waterLevel < 50 ? 'warning' : 'good'
    },
    { 
      label: 'Autonomia estimada', 
      value: `${point.autonomy} dias`, 
      icon: Clock,
      status: point.autonomy < 3 ? 'low' : point.autonomy > 7 ? 'high' : 'normal',
      trend: point.autonomy < 3 ? 'critical' : point.autonomy < 5 ? 'warning' : 'good'
    },
    { 
      label: 'Turbidez', 
      value: point.turbidity === 'high' ? 'Alta' : point.turbidity === 'medium' ? 'Media' : 'Baja', 
      icon: FlaskConical,
      status: point.turbidity,
      inverted: true,
      trend: point.turbidity === 'high' ? 'critical' : point.turbidity === 'medium' ? 'warning' : 'good'
    },
    { 
      label: 'pH', 
      value: point.ph.toString(), 
      icon: Activity,
      status: point.ph < 6.5 || point.ph > 8.5 ? 'low' : 'normal',
      trend: point.ph < 6.5 || point.ph > 8.5 ? 'warning' : 'good'
    },
    { 
      label: 'TDS', 
      value: `${point.tds} ppm`, 
      icon: Droplets,
      status: point.tds > 500 ? 'high' : 'normal',
      trend: point.tds > 500 ? 'warning' : 'good'
    },
    { 
      label: 'Temperatura', 
      value: `${point.temperature} °C`, 
      icon: Thermometer,
      status: point.temperature > 30 ? 'high' : 'normal',
      trend: point.temperature > 30 ? 'warning' : 'good'
    },
    { 
      label: 'Cloro residual', 
      value: point.chlorine === 'low' ? 'Bajo' : point.chlorine === 'high' ? 'Alto' : 'Normal', 
      icon: FlaskConical,
      status: point.chlorine,
      trend: point.chlorine === 'low' ? 'critical' : point.chlorine === 'high' ? 'warning' : 'good'
    },
    { 
      label: 'Presion', 
      value: point.pressure === 'low' ? 'Baja' : point.pressure === 'high' ? 'Alta' : 'Normal', 
      icon: Gauge,
      status: point.pressure,
      trend: point.pressure === 'low' ? 'warning' : 'good'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/map">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{point.name}</h1>
              {isOnline ? (
                <Wifi className="w-5 h-5 text-success" />
              ) : (
                <WifiOff className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getRiskColor(point.status)}>
                {getStatusLabel(point.status)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Ultima lectura: {point.lastReading}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/dashboard/actions?point=${point.id}`}>
            <Button className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Crear accion correctiva
            </Button>
          </Link>
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" />
            Ver historial
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AquaRiesgo Card */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="w-5 h-5 text-primary" />
              AquaRiesgo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <AquaRiskIndicator score={point.aquaRisk} />
            
            {/* Risk Factors */}
            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium text-foreground">Factores de riesgo:</p>
              <div className="space-y-1.5">
                {point.waterLevel < 30 && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-muted-foreground">Nivel de agua bajo ({point.waterLevel}%)</span>
                  </div>
                )}
                {point.turbidity === 'high' && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-danger" />
                    <span className="text-muted-foreground">Turbidez elevada</span>
                  </div>
                )}
                {point.chlorine === 'low' && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-muted-foreground">Cloro residual bajo</span>
                  </div>
                )}
                {point.pressure === 'low' && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-muted-foreground">Presion baja (posible fuga)</span>
                  </div>
                )}
                {point.aquaRisk < 30 && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-muted-foreground">Sin factores criticos detectados</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <Card className="lg:col-span-2 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-primary" />
              Metricas del sensor
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric) => {
                const metricStatus = getMetricStatus(metric.status as 'low' | 'normal' | 'high' | 'medium', metric.inverted)
                return (
                  <div 
                    key={metric.label}
                    className={cn(
                      "p-4 rounded-xl border",
                      metric.trend === 'critical' ? 'border-destructive/30 bg-destructive/5' :
                      metric.trend === 'warning' ? 'border-warning/30 bg-warning/5' :
                      'border-border bg-muted/30'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg",
                        metric.trend === 'critical' ? 'bg-destructive/10' :
                        metric.trend === 'warning' ? 'bg-warning/10' :
                        'bg-primary/10'
                      )}>
                        <metric.icon className={cn(
                          "w-4 h-4",
                          metric.trend === 'critical' ? 'text-destructive' :
                          metric.trend === 'warning' ? 'text-warning' :
                          'text-primary'
                        )} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation */}
      {point.aquaRisk >= 50 && (
        <Card className="bg-warning/5 border-warning/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-warning/10 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Recomendacion</h3>
                <p className="text-muted-foreground">
                  {point.aquaRisk >= 70 
                    ? 'Revisar cloracion, evitar consumo directo, verificar posible fuga y programar abastecimiento preventivo.'
                    : 'Monitorear parametros de calidad y programar mantenimiento preventivo del punto de agua.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Alerts */}
      {pointAlerts.length > 0 && (
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Alertas relacionadas ({pointAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {pointAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0",
                    alert.severity === 'critical' ? 'bg-destructive/10' :
                    alert.severity === 'high' ? 'bg-danger/10' :
                    'bg-warning/10'
                  )}>
                    <AlertTriangle className={cn(
                      "w-5 h-5",
                      alert.severity === 'critical' ? 'text-destructive' :
                      alert.severity === 'high' ? 'text-danger' :
                      'text-warning'
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={cn(
                        alert.severity === 'critical' ? 'bg-destructive text-destructive-foreground' :
                        alert.severity === 'high' ? 'bg-danger text-danger-foreground' :
                        'bg-warning text-warning-foreground'
                      )}>
                        {alert.severity === 'critical' ? 'Critica' :
                         alert.severity === 'high' ? 'Alta' : 'Media'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{alert.cause}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Link href={`/dashboard/actions?point=${point.id}`}>
          <Button className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Crear accion correctiva
          </Button>
        </Link>
        <Button variant="outline" className="gap-2">
          <History className="w-4 h-4" />
          Ver historial
        </Button>
        <Button variant="outline" className="gap-2 text-success hover:text-success">
          <CheckCircle className="w-4 h-4" />
          Marcar como atendido
        </Button>
      </div>
    </div>
  )
}
