'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Map, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Droplets,
  Building2,
  GraduationCap,
  Heart,
  Home,
  Truck,
  Wifi,
  WifiOff
} from 'lucide-react'
import { waterPoints, getRiskColor, getStatusLabel, type WaterPoint, type RiskLevel } from '@/lib/data'
import { cn } from '@/lib/utils'

// Importar el visor 3D dinámicamente para evitar errores de SSR
const Pipeline3DViewer = dynamic(
  () => import('@/components/pipeline-3d-viewer').then(mod => mod.Pipeline3DViewer),
  { 
    ssr: false,
    loading: () => (
      <Card className="bg-card">
        <CardContent className="h-[450px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Cargando visualización 3D...</p>
          </div>
        </CardContent>
      </Card>
    )
  }
)

const typeIcons: Record<WaterPoint['type'], React.ElementType> = {
  well: Droplets,
  tank: Building2,
  school: GraduationCap,
  health: Heart,
  residential: Home,
  supply: Truck,
}

function getMapPointColor(status: RiskLevel): string {
  switch (status) {
    case 'stable': return 'bg-success'
    case 'review': return 'bg-warning'
    case 'high': return 'bg-danger'
    case 'critical': return 'bg-destructive'
    case 'offline': return 'bg-muted'
  }
}

export function CommunityMap() {
  const [selectedPoint, setSelectedPoint] = useState<WaterPoint | null>(null)

  const criticalPoints = waterPoints.filter(p => p.status === 'critical').length
  const reviewPoints = waterPoints.filter(p => p.status === 'review' || p.status === 'high').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Area */}
      <Card className="lg:col-span-2 bg-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Map className="w-5 h-5 text-primary" />
            Mapa de la Comunidad - El Cedral
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full h-[500px] bg-muted/30 overflow-hidden">
            {/* Simplified community map visualization */}
            <svg viewBox="0 0 100 80" className="w-full h-full">
              {/* Grid lines */}
              {[...Array(10)].map((_, i) => (
                <g key={i}>
                  <line
                    x1={i * 10}
                    y1="0"
                    x2={i * 10}
                    y2="80"
                    stroke="currentColor"
                    strokeWidth="0.1"
                    className="text-border"
                  />
                  <line
                    x1="0"
                    y1={i * 8}
                    x2="100"
                    y2={i * 8}
                    stroke="currentColor"
                    strokeWidth="0.1"
                    className="text-border"
                  />
                </g>
              ))}

              {/* Roads */}
              <path
                d="M 0 40 L 100 40 M 50 0 L 50 80 M 20 20 L 80 20 M 20 60 L 80 60"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-muted-foreground/30"
              />

              {/* Area labels */}
              <text x="15" y="12" className="text-[3px] fill-muted-foreground font-medium">Zona Norte</text>
              <text x="75" y="12" className="text-[3px] fill-muted-foreground font-medium">Zona Este</text>
              <text x="15" y="75" className="text-[3px] fill-muted-foreground font-medium">Zona Oeste</text>
              <text x="75" y="75" className="text-[3px] fill-muted-foreground font-medium">Zona Sur</text>

              {/* Water points */}
              {waterPoints.map((point) => {
                const Icon = typeIcons[point.type]
                const isSelected = selectedPoint?.id === point.id
                const isOffline = point.status === 'offline'

                return (
                  <g 
                    key={point.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedPoint(point)}
                  >
                    {/* Pulse animation for critical/high points */}
                    {(point.status === 'critical' || point.status === 'high') && (
                      <circle
                        cx={point.coordinates.x}
                        cy={point.coordinates.y}
                        r="6"
                        className={cn(
                          'animate-pulse',
                          point.status === 'critical' ? 'fill-destructive/30' : 'fill-danger/30'
                        )}
                      />
                    )}

                    {/* Point circle */}
                    <circle
                      cx={point.coordinates.x}
                      cy={point.coordinates.y}
                      r={isSelected ? 5 : 4}
                      className={cn(
                        getMapPointColor(point.status),
                        isSelected && 'stroke-foreground stroke-[0.5]'
                      )}
                    />

                    {/* Point label */}
                    <text
                      x={point.coordinates.x}
                      y={point.coordinates.y + 8}
                      className="text-[2.5px] fill-foreground text-center font-medium"
                      textAnchor="middle"
                    >
                      {point.name.split(' ').slice(0, 2).join(' ')}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
              <p className="text-xs font-medium text-foreground mb-2">Estado de puntos</p>
              <div className="space-y-1.5">
                {[
                  { status: 'stable' as const, label: 'Estable' },
                  { status: 'review' as const, label: 'En revisión' },
                  { status: 'high' as const, label: 'Riesgo alto' },
                  { status: 'critical' as const, label: 'Crítico' },
                  { status: 'offline' as const, label: 'Sin conexión' },
                ].map((item) => (
                  <div key={item.status} className="flex items-center gap-2">
                    <span className={cn('w-3 h-3 rounded-full', getMapPointColor(item.status))} />
                    <span className="text-[10px] text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Panel */}
      <div className="space-y-6">
        {/* Community Summary */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resumen de Comunidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Comunidad</span>
                <span className="text-sm font-medium text-foreground">El Cedral</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado general</span>
                <span className="text-sm font-medium px-2 py-0.5 rounded bg-danger text-danger-foreground">
                  Riesgo alto
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Puntos críticos</span>
                <span className="text-sm font-medium text-destructive">{criticalPoints}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Puntos en revisión</span>
                <span className="text-sm font-medium text-warning">{reviewPoints}</span>
              </div>
            </div>

            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-foreground">Recomendación principal</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Programar abastecimiento preventivo y revisar posible fuga en zona norte.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Point Detail */}
        {selectedPoint ? (
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg truncate">{selectedPoint.name}</span>
                {selectedPoint.status === 'offline' ? (
                  <WifiOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Wifi className="w-4 h-4 text-success" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  getRiskColor(selectedPoint.status)
                )}>
                  {getStatusLabel(selectedPoint.status)}
                </span>
                <span className="text-sm text-muted-foreground">
                  AquaRiesgo: {selectedPoint.aquaRisk}/100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Nivel</p>
                  <p className="text-sm font-medium">{selectedPoint.waterLevel}%</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Autonomía</p>
                  <p className="text-sm font-medium">{selectedPoint.autonomy} días</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Turbidez</p>
                  <p className="text-sm font-medium capitalize">{
                    selectedPoint.turbidity === 'high' ? 'Alta' :
                    selectedPoint.turbidity === 'medium' ? 'Media' : 'Baja'
                  }</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">pH</p>
                  <p className="text-sm font-medium">{selectedPoint.ph}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/points/${selectedPoint.id}`} className="flex-1">
                  <Button size="sm" className="w-full gap-1">
                    <Eye className="w-4 h-4" />
                    Ver detalle
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card">
            <CardContent className="py-12 text-center">
              <Map className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Selecciona un punto en el mapa para ver sus detalles
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/alerts">
              <Button variant="outline" className="w-full justify-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Ver todas las alertas
              </Button>
            </Link>
            <Link href="/dashboard/actions">
              <Button variant="outline" className="w-full justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Acciones correctivas
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>

      {/* 3D Pipeline Visualization */}
      <Pipeline3DViewer />
    </div>
  )
}
