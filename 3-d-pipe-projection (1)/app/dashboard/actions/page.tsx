'use client'

import { useState } from 'react'
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  User,
  Calendar,
  Camera,
  ChevronRight,
  Search,
  Filter,
  FileText,
  Activity,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { correctiveActions, alerts, waterPoints } from '@/lib/data'
import { cn } from '@/lib/utils'

type StatusFilter = 'all' | 'pending' | 'in-progress' | 'resolved'

const statusLabels = {
  pending: 'Pendiente',
  'in-progress': 'En proceso',
  resolved: 'Resuelto',
}

const statusColors = {
  pending: 'bg-warning/10 text-warning border-warning/30',
  'in-progress': 'bg-primary/10 text-primary border-primary/30',
  resolved: 'bg-success/10 text-success border-success/30',
}

export default function ActionsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredActions = correctiveActions.filter(action => {
    const matchesStatus = statusFilter === 'all' || action.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      action.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.responsible.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const pendingCount = correctiveActions.filter(a => a.status === 'pending').length
  const inProgressCount = correctiveActions.filter(a => a.status === 'in-progress').length
  const resolvedCount = correctiveActions.filter(a => a.status === 'resolved').length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{correctiveActions.length}</p>
                <p className="text-xs text-muted-foreground">Total acciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">En proceso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{resolvedCount}</p>
                <p className="text-xs text-muted-foreground">Resueltos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and New Action */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar accion o responsable..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {(['all', 'pending', 'in-progress', 'resolved'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status === 'all' ? 'Todas' : statusLabels[status]}
                  </Button>
                ))}
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nueva accion
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Registrar accion correctiva</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="alert">Alerta relacionada</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar alerta" />
                      </SelectTrigger>
                      <SelectContent>
                        {alerts.map((alert) => (
                          <SelectItem key={alert.id} value={alert.id}>
                            {alert.pointName} - {alert.cause.slice(0, 40)}...
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="action">Accion tomada</Label>
                    <Textarea 
                      id="action" 
                      placeholder="Describa la accion correctiva realizada..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="responsible">Responsable</Label>
                      <Input id="responsible" placeholder="Nombre del responsable" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="evidence">Evidencia fotografica</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Arrastra una imagen o haz clic para subir
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="in-progress">En proceso</SelectItem>
                        <SelectItem value="resolved">Resuelto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Guardar accion
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Progress Example */}
      <Card className="bg-sidebar text-sidebar-foreground">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Flujo de resolucion</h3>
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4">
            {[
              { icon: AlertTriangle, label: 'Alerta detectada', active: true },
              { icon: User, label: 'Responsable asignado', active: true },
              { icon: CheckCircle, label: 'Accion realizada', active: true },
              { icon: Activity, label: 'Nueva medicion', active: false },
              { icon: CheckCircle, label: 'Punto recuperado', active: false },
            ].map((step, index) => (
              <div key={step.label} className="flex items-center gap-2 lg:gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    step.active ? 'bg-primary' : 'bg-sidebar-accent'
                  )}>
                    <step.icon className={cn(
                      "w-5 h-5",
                      step.active ? 'text-primary-foreground' : 'text-sidebar-foreground/50'
                    )} />
                  </div>
                  <span className={cn(
                    "mt-1 text-xs text-center max-w-[80px]",
                    step.active ? 'text-sidebar-foreground' : 'text-sidebar-foreground/50'
                  )}>
                    {step.label}
                  </span>
                </div>
                {index < 4 && (
                  <ArrowRight className="w-4 h-4 text-sidebar-foreground/30 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions List */}
      <Card className="bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="w-5 h-5 text-primary" />
            Acciones Correctivas ({filteredActions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredActions.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <p className="text-muted-foreground">No hay acciones que mostrar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActions.map((action) => {
                const relatedAlert = alerts.find(a => a.id === action.alertId)
                return (
                  <div 
                    key={action.id}
                    className="p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge className={cn('border', statusColors[action.status])}>
                            {statusLabels[action.status]}
                          </Badge>
                          {relatedAlert && (
                            <span className="text-sm text-muted-foreground">
                              Alerta: {relatedAlert.pointName}
                            </span>
                          )}
                        </div>

                        <p className="text-foreground mb-3">{action.action}</p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {action.responsible}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(action.date).toLocaleDateString('es-MX', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
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
