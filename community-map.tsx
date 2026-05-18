'use client'

import { 
  FileText, 
  Download, 
  Send, 
  Share2, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Waves,
  Clock,
  BarChart3,
  PieChart,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { waterPoints, alerts, correctiveActions, alertsByType } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function ReportsPage() {
  const currentDate = new Date()
  const weekStart = new Date(currentDate)
  weekStart.setDate(currentDate.getDate() - 7)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const weeklyStats = {
    monitored: waterPoints.length,
    yellowAlerts: alerts.filter(a => a.severity === 'medium' || a.severity === 'high').length,
    redAlerts: alerts.filter(a => a.severity === 'critical').length,
    mainProblem: 'Bajo nivel de agua y turbidez elevada',
    actionsCompleted: correctiveActions.filter(a => a.status === 'resolved').length,
    actionsTotal: correctiveActions.length,
    pointsRecovered: 2,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
          <p className="text-muted-foreground mt-1">
            Informes semanales y analisis para autoridades
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Seleccionar periodo
          </Button>
        </div>
      </div>

      {/* Weekly Report Card */}
      <Card className="bg-card overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-5 h-5 text-primary" />
                Reporte Semanal
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {formatDate(weekStart)} - {formatDate(currentDate)}
              </p>
            </div>
            <Badge className="bg-primary text-primary-foreground">Comunidad El Cedral</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Puntos monitoreados</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{weeklyStats.monitored}</p>
            </div>

            <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="text-sm text-muted-foreground">Alertas amarillas</span>
              </div>
              <p className="text-3xl font-bold text-warning">{weeklyStats.yellowAlerts}</p>
            </div>

            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Alertas rojas</span>
              </div>
              <p className="text-3xl font-bold text-destructive">{weeklyStats.redAlerts}</p>
            </div>

            <div className="p-4 rounded-xl bg-success/5 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Puntos recuperados</span>
              </div>
              <p className="text-3xl font-bold text-success">{weeklyStats.pointsRecovered}</p>
            </div>
          </div>

          {/* Main Problem */}
          <div className="p-4 rounded-xl bg-warning/5 border border-warning/20 mb-6">
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Principal problema detectado</p>
                <p className="text-muted-foreground mt-1">{weeklyStats.mainProblem}</p>
              </div>
            </div>
          </div>

          {/* Actions Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Acciones realizadas
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Acciones completadas</span>
                  <span className="font-semibold text-foreground">{weeklyStats.actionsCompleted}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Acciones totales</span>
                  <span className="font-semibold text-foreground">{weeklyStats.actionsTotal}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Tasa de resolucion</span>
                  <span className="font-semibold text-success">
                    {Math.round((weeklyStats.actionsCompleted / weeklyStats.actionsTotal) * 100) || 0}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Alertas por tipo
              </h3>
              <div className="space-y-2">
                {alertsByType.slice(0, 4).map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{item.type}</span>
                        <span className="text-sm font-medium text-foreground">{item.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(item.count / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Recomendacion para autoridades
            </h3>
            <p className="text-muted-foreground">
              Revisar posible fuga en zona norte, programar limpieza del tinaco escolar y coordinar abastecimiento preventivo con proveedor de pipas. Se sugiere inspeccion de la red de distribucion en las proximas 48 horas.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Send className="w-4 h-4" />
              Enviar a municipio
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Compartir reporte
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historical Reports */}
      <Card className="bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-primary" />
            Reportes anteriores
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {[
              { date: '6-12 Ene 2024', alerts: 5, resolved: 4, status: 'archived' },
              { date: '30 Dic - 5 Ene 2024', alerts: 3, resolved: 3, status: 'archived' },
              { date: '23-29 Dic 2023', alerts: 7, resolved: 6, status: 'archived' },
            ].map((report, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reporte Semanal</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-muted-foreground">
                      {report.alerts} alertas / {report.resolved} resueltas
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats for Different Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Reporte mensual</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Analisis completo del mes con tendencias y proyecciones.
            </p>
            <Button variant="link" className="p-0 mt-3 h-auto">
              Generar reporte
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 mb-4">
              <PieChart className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground">Reporte de calidad</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Detalle de parametros de calidad del agua por punto.
            </p>
            <Button variant="link" className="p-0 mt-3 h-auto">
              Generar reporte
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 mb-4">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Reporte ejecutivo</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Resumen para autoridades y tomadores de decisiones.
            </p>
            <Button variant="link" className="p-0 mt-3 h-auto">
              Generar reporte
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
