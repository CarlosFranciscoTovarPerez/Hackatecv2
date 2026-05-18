'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Waves, 
  Search, 
  Filter,
  Droplets,
  Building2,
  GraduationCap,
  Heart,
  Home,
  Truck,
  Wifi,
  WifiOff,
  Eye,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { waterPoints, getRiskColor, getStatusLabel, type WaterPoint, type RiskLevel } from '@/lib/data'
import { cn } from '@/lib/utils'

type StatusFilter = 'all' | RiskLevel

const typeIcons: Record<WaterPoint['type'], React.ElementType> = {
  well: Droplets,
  tank: Building2,
  school: GraduationCap,
  health: Heart,
  residential: Home,
  supply: Truck,
}

const typeLabels: Record<WaterPoint['type'], string> = {
  well: 'Pozo',
  tank: 'Tinaco',
  school: 'Escuela',
  health: 'Centro de salud',
  residential: 'Zona habitacional',
  supply: 'Punto de pipa',
}

export default function PointsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPoints = waterPoints.filter(point => {
    const matchesStatus = statusFilter === 'all' || point.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      point.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusCounts = {
    stable: waterPoints.filter(p => p.status === 'stable').length,
    review: waterPoints.filter(p => p.status === 'review').length,
    high: waterPoints.filter(p => p.status === 'high').length,
    critical: waterPoints.filter(p => p.status === 'critical').length,
    offline: waterPoints.filter(p => p.status === 'offline').length,
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <Waves className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.stable}</p>
                <p className="text-xs text-muted-foreground">Estables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
                <Waves className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.review}</p>
                <p className="text-xs text-muted-foreground">En revision</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-danger/10">
                <Waves className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.high}</p>
                <p className="text-xs text-muted-foreground">Riesgo alto</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                <Waves className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.critical}</p>
                <p className="text-xs text-muted-foreground">Criticos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <WifiOff className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.offline}</p>
                <p className="text-xs text-muted-foreground">Sin conexion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar punto de agua..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Estado:</span>
              {(['all', 'stable', 'review', 'high', 'critical', 'offline'] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    statusFilter === status && status !== 'all' && 
                    (status === 'critical' ? 'bg-destructive hover:bg-destructive/90' :
                     status === 'high' ? 'bg-danger hover:bg-danger/90' :
                     status === 'review' ? 'bg-warning hover:bg-warning/90 text-warning-foreground' :
                     status === 'stable' ? 'bg-success hover:bg-success/90' :
                     'bg-muted hover:bg-muted/90 text-muted-foreground')
                  )}
                >
                  {status === 'all' ? 'Todos' : getStatusLabel(status)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Points List */}
      <Card className="bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Waves className="w-5 h-5 text-primary" />
            Puntos de Agua ({filteredPoints.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredPoints.length === 0 ? (
            <div className="text-center py-12">
              <Waves className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No hay puntos que mostrar con los filtros actuales.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPoints.map((point) => {
                const TypeIcon = typeIcons[point.type]
                const isOnline = point.status !== 'offline'

                return (
                  <Link 
                    key={point.id}
                    href={`/dashboard/points/${point.id}`}
                    className="block"
                  >
                    <div className={cn(
                      "p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors",
                      point.status === 'critical' ? 'border-l-4 border-l-destructive' :
                      point.status === 'high' ? 'border-l-4 border-l-danger' :
                      point.status === 'review' ? 'border-l-4 border-l-warning' :
                      point.status === 'stable' ? 'border-l-4 border-l-success' :
                      'border-l-4 border-l-muted'
                    )}>
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0",
                          point.status === 'critical' ? 'bg-destructive/10' :
                          point.status === 'high' ? 'bg-danger/10' :
                          point.status === 'review' ? 'bg-warning/10' :
                          point.status === 'stable' ? 'bg-success/10' :
                          'bg-muted'
                        )}>
                          <TypeIcon className={cn(
                            "w-6 h-6",
                            point.status === 'critical' ? 'text-destructive' :
                            point.status === 'high' ? 'text-danger' :
                            point.status === 'review' ? 'text-warning' :
                            point.status === 'stable' ? 'text-success' :
                            'text-muted-foreground'
                          )} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">{point.name}</h3>
                            {isOnline ? (
                              <Wifi className="w-4 h-4 text-success flex-shrink-0" />
                            ) : (
                              <WifiOff className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Badge className={getRiskColor(point.status)}>
                              {getStatusLabel(point.status)}
                            </Badge>
                            <span className="text-muted-foreground">{typeLabels[point.type]}</span>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-6 text-sm">
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{point.waterLevel}%</p>
                            <p className="text-xs text-muted-foreground">Nivel</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{point.aquaRisk}/100</p>
                            <p className="text-xs text-muted-foreground">AquaRiesgo</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{point.autonomy} dias</p>
                            <p className="text-xs text-muted-foreground">Autonomia</p>
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>

                      {/* Mobile metrics */}
                      <div className="sm:hidden grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{point.waterLevel}%</p>
                          <p className="text-xs text-muted-foreground">Nivel</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{point.aquaRisk}/100</p>
                          <p className="text-xs text-muted-foreground">AquaRiesgo</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{point.autonomy}d</p>
                          <p className="text-xs text-muted-foreground">Autonomia</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
