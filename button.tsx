'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Droplets, 
  Menu, 
  X, 
  Activity, 
  ShieldCheck, 
  Bell, 
  MapPin,
  ArrowRight,
  Radio,
  AlertTriangle,
  CheckCircle,
  FileText,
  Waves,
  Gauge,
  ThermometerSun,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AquaComunidad</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#inicio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link href="#solucion" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Solución
              </Link>
              <Link href="#modulos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Módulos
              </Link>
              <Link href="#impacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Impacto
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline">Ver Dashboard</Button>
              </Link>
              <Link href="/dashboard?simulate=true">
                <Button>Simular Alerta</Button>
              </Link>
            </div>

            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="px-4 py-4 space-y-3">
              <Link href="#inicio" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Inicio
              </Link>
              <Link href="#solucion" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Solución
              </Link>
              <Link href="#modulos" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Módulos
              </Link>
              <Link href="#impacto" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Impacto
              </Link>
              <div className="pt-3 space-y-2">
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full">Ver Dashboard</Button>
                </Link>
                <Link href="/dashboard?simulate=true" className="block">
                  <Button className="w-full">Simular Alerta</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Radio className="w-4 h-4" />
              Plataforma IoT de Alerta Temprana
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Alerta temprana para proteger el agua de las comunidades
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              AquaComunidad usa sensores IoT, mapas, alertas y reportes para detectar riesgos de calidad, fugas y desabasto antes de que se conviertan en una crisis.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 px-8">
                  Ver Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard?simulate=true">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  <AlertTriangle className="w-5 h-5" />
                  Simular Alerta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Cards */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Monitoreo en tiempo real</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sensores IoT que miden nivel, calidad y presión del agua cada minuto.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-4">
                  <ShieldCheck className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Prevención de desabasto</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detecta niveles bajos y programa abastecimiento antes de la crisis.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 mb-4">
                  <Waves className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Calidad del agua</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mide turbidez, pH, cloro y temperatura para garantizar agua segura.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-warning/20 mb-4">
                  <Bell className="w-6 h-6 text-warning-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Alertas comunitarias</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Notificaciones automáticas a operadores y ciudadanos cuando hay riesgo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">El Problema</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Muchas comunidades detectan problemas de agua demasiado tarde: cuando ya hay escasez, quejas, agua turbia o riesgos de salud. La falta de monitoreo preventivo causa crisis evitables.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucion" className="py-20 bg-sidebar text-sidebar-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">La Solución</h2>
            <p className="mt-4 text-sidebar-foreground/70 max-w-2xl mx-auto">
              Un sistema integral que conecta sensores, análisis y acción preventiva.
            </p>
          </div>

          {/* Solution Flow */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-2">
            {[
              { icon: Radio, label: 'Sensor IoT', color: 'bg-primary' },
              { icon: Activity, label: 'Plataforma', color: 'bg-secondary' },
              { icon: Gauge, label: 'AquaRiesgo', color: 'bg-accent' },
              { icon: Bell, label: 'Alerta', color: 'bg-warning' },
              { icon: CheckCircle, label: 'Acción', color: 'bg-success' },
              { icon: FileText, label: 'Reporte', color: 'bg-primary' },
            ].map((item, index) => (
              <div key={item.label} className="flex items-center gap-2 lg:gap-4">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${item.color}`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="mt-2 text-sm font-medium">{item.label}</span>
                </div>
                {index < 5 && (
                  <ArrowRight className="w-5 h-5 text-sidebar-foreground/40 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modulos" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Módulos del Sistema</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para monitorear y proteger el agua de tu comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Mapa Comunitario', desc: 'Visualiza todos los puntos de agua con su estado en tiempo real.' },
              { icon: Gauge, title: 'AquaRiesgo', desc: 'Índice de riesgo hídrico que combina múltiples indicadores.' },
              { icon: Bell, title: 'Sistema de Alertas', desc: 'Notificaciones por severidad con recomendaciones automáticas.' },
              { icon: CheckCircle, title: 'Acciones Correctivas', desc: 'Registro y seguimiento de acciones hasta su resolución.' },
              { icon: FileText, title: 'Reportes', desc: 'Informes semanales para municipios y autoridades.' },
              { icon: Users, title: 'Reportes Ciudadanos', desc: 'Permite a la comunidad reportar problemas desde el móvil.' },
            ].map((module) => (
              <Card key={module.title} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <module.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{module.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impacto" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Impacto</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Menos reacción tardía, más prevención comunitaria.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '80%', label: 'Reducción de crisis hídricas' },
              { value: '24/7', label: 'Monitoreo continuo' },
              { value: '15 min', label: 'Tiempo de alerta' },
              { value: '100+', label: 'Comunidades potenciales' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-sidebar text-sidebar-foreground overflow-hidden">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold">Comienza a monitorear tu comunidad</h2>
              <p className="mt-4 text-sidebar-foreground/70 max-w-2xl mx-auto">
                Únete a AquaComunidad y protege el recurso más valioso de tu comunidad con tecnología IoT de alerta temprana.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 px-8 bg-primary hover:bg-primary/90">
                    Explorar Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/report">
                  <Button size="lg" variant="outline" className="gap-2 px-8 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                    <ThermometerSun className="w-5 h-5" />
                    Reportar Problema
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Droplets className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">AquaComunidad</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma IoT de alerta temprana para comunidades.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contacto
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Documentación
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
