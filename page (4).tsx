'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Bell, 
  AlertTriangle, 
  Filter, 
  Search,
  Clock,
  MapPin,
  CheckCircle,
  ChevronRight,
  AlertCircle,
  ShieldAlert,
  Info
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { alerts, getSeverityColor } from '@/lib/data'
import { cn } from '@/lib/utils'

type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low'
type StatusFilter = 'all' | 'active' | 'in-progress' | 'resolved'

const severityIcons = {
  critical: ShieldAlert,
  high: AlertTriangle,
  medium: AlertCircle,
  low: Info,
}

const severityLabels = {
  critical: 'Critica',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

const statusLabels = {
  active: 'Activa',
  'in-progress': 'En proceso',
  resolved: 'Resuelta',
}

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      alert.pointName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.cause.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSeverity && matchesStatus && matchesSearch
  })

  const alertCounts = {
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
  }

  const activeCount = alerts.filter(a => a.status === 'active').length
  const inProgressCount = alerts.filter(a => a.status === 'in-progress').length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                <ShieldAlert className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{alertCounts.critical}</p>
                <p className="text-xs text-muted-foreground">Criticas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-danger/10">
                <AlertTriangle className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{alertCounts.high}</p>
                <p className="text-xs text-muted-foreground">Altas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{alertCounts.medium}</p>
                <p className="text-xs text-muted-foreground">Medias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <Bell className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
                <p className="text-xs text-muted-foreground">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por punto o causa..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Severidad:</span>
              </div>
              {(['all', 'critical', 'high', 'medium', 'low'] as const).map((severity) => (
                <Button
                  key={severity}
                  variant={severityFilter === severity ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSeverityFilter(severity)}
                  className={cn(
                    severityFilter === severity && severity !== 'all' && 
                    (severity === 'critical' ? 'bg-destructive hover:bg-destructive/90' :
                     severity === 'high' ? 'bg-danger hover:bg-danger/90' :
                     severity === 'medium' ? 'bg-warning hover:bg-warning/90 text-warning-foreground' :
                     'bg-success hover:bg-success/90')
                  )}
                >
                  {severity === 'all' ? 'Todas' : severityLabels[severity]}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="text-sm text-muted-foreground">Estado:</span>
            {(['all', 'active', 'in-progress', 'resolved'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === 'all' ? 'Todos' : statusLabels[status]}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card className="bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-lg">
              <Bell className="w-5 h-5 text-primary" />
              Alertas ({filteredAlerts.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <p className="text-muted-foreground">No hay alertas que mostrar con los filtros actuales.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const Icon = severityIcons[alert.severity]
                return (
                  <div 
                    key={alert.id}
                    className={cn(
                      "relative p-4 rounded-xl border-l-4 bg-muted/30",
                      alert.severity === 'critical' ? 'border-l-destructive' :
                      alert.severity === 'high' ? 'border-l-danger' :
                      alert.severity === 'medium' ? 'border-l-warning' :
                      'border-l-success'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0",
                        alert.severity === 'critical' ? 'bg-destructive/10' :
                        alert.severity === 'high' ? 'bg-danger/10' :
                        alert.severity === 'medium' ? 'bg-warning/10' :
                        'bg-success/10'
                      )}>
                        <Icon className={cn(
                          "w-6 h-6",
                          alert.severity === 'critical' ? 'text-destructive' :
                          alert.severity === 'high' ? 'text-danger' :
                          alert.severity === 'medium' ? 'text-warning' :
                          'text-success'
                        )} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {severityLabels[alert.severity]}
                          </Badge>
                          <Badge variant="outline" className={cn(
                            alert.status === 'active' ? 'border-destructive text-destructive' :
                            alert.status === 'in-progress' ? 'border-warning text-warning' :
                            'border-success text-success'
                          )}>
                            {statusLabels[alert.status]}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <Link 
                              href={`/dashboard/points/${alert.pointId}`}
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {alert.pointName}
                            </Link>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {alert.time}
                          </span>
                        </div>

                        <p className="text-foreground font-medium mb-2">{alert.cause}</p>

                        <div className="p-3 bg-background rounded-lg border border-border">
                          <p className="text-sm">
                            <span className="font-medium text-primary">Recomendacion:</span>{' '}
                            <span className="text-muted-foreground">{alert.recommendation}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <Link href={`/dashboard/actions?alert=${alert.id}`}>
                            <Button size="sm" className="gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Crear accion correctiva
                            </Button>
                          </Link>
                          <Link href={`/dashboard/points/${alert.pointId}`}>
                            <Button size="sm" variant="outline" className="gap-1">
                              Ver punto
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
