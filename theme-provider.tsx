'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Droplets, 
  Camera, 
  MapPin, 
  Send,
  AlertTriangle,
  Waves,
  Wind,
  Thermometer,
  ArrowLeft,
  CheckCircle,
  Home,
  Map,
  Bell,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const problemTypes = [
  { id: 'no-water', label: 'Falta de agua', icon: Droplets },
  { id: 'turbid', label: 'Agua turbia', icon: Waves },
  { id: 'smell', label: 'Mal olor', icon: Wind },
  { id: 'leak', label: 'Fuga de agua', icon: AlertTriangle },
  { id: 'pressure', label: 'Baja presion', icon: Thermometer },
]

export default function ReportPage() {
  const [selectedProblem, setSelectedProblem] = useState<string>('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-2">
              <Droplets className="w-6 h-6" />
              <span className="font-bold">AquaComunidad</span>
            </Link>
          </div>
        </header>

        <main className="p-4 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-sm">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Reporte enviado</h1>
            <p className="text-muted-foreground mb-6">
              Tu reporte ha sido recibido. El equipo de monitoreo revisara la situacion y tomara las acciones necesarias.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Numero de seguimiento: <span className="font-mono font-medium text-foreground">RPT-2024-0156</span>
            </p>
            <div className="space-y-3">
              <Link href="/report">
                <Button className="w-full" onClick={() => setSubmitted(false)}>
                  Enviar otro reporte
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3 p-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6" />
            <span className="font-bold">AquaComunidad</span>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Reportar problema de agua</h1>
          <p className="text-muted-foreground mt-1">
            Tu reporte ayuda a detectar y solucionar problemas mas rapido.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Type Selection */}
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                Tipo de problema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedProblem} 
                onValueChange={setSelectedProblem}
                className="grid grid-cols-2 gap-3"
              >
                {problemTypes.map((problem) => (
                  <div key={problem.id}>
                    <RadioGroupItem
                      value={problem.id}
                      id={problem.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={problem.id}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        "hover:bg-muted/50",
                        selectedProblem === problem.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      )}
                    >
                      <problem.icon className={cn(
                        "w-6 h-6 mb-2",
                        selectedProblem === problem.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "text-sm font-medium text-center",
                        selectedProblem === problem.id ? "text-primary" : "text-foreground"
                      )}>
                        {problem.label}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Ubicacion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Ej: Calle Principal #45, Col. Centro"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button type="button" variant="outline" className="w-full gap-2">
                <MapPin className="w-4 h-4" />
                Usar mi ubicacion actual
              </Button>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Descripcion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe el problema que observas. Incluye detalles como desde cuando ocurre, que tan grave es, etc."
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Camera className="w-4 h-4 text-primary" />
                Foto (opcional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Toca para tomar o subir foto
                </p>
                <p className="text-xs text-muted-foreground">
                  Una imagen ayuda a entender mejor el problema
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full gap-2"
            disabled={!selectedProblem || !location}
          >
            <Send className="w-5 h-5" />
            Enviar reporte
          </Button>
        </form>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-pb">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground">
            <Home className="w-5 h-5" />
            <span className="text-xs">Inicio</span>
          </Link>
          <Link href="/dashboard/map" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground">
            <Map className="w-5 h-5" />
            <span className="text-xs">Mapa</span>
          </Link>
          <Link href="/dashboard/alerts" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground">
            <Bell className="w-5 h-5" />
            <span className="text-xs">Alertas</span>
          </Link>
          <Link href="/report" className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-medium">Reportar</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
