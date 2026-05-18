'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Droplets, 
  LayoutDashboard, 
  Map, 
  Waves, 
  Bell, 
  Gauge, 
  CheckCircle, 
  FileText, 
  Settings,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { communities } from '@/lib/data'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Mapa', href: '/dashboard/map', icon: Map },
  { name: 'Puntos de Agua', href: '/dashboard/points', icon: Waves },
  { name: 'Alertas', href: '/dashboard/alerts', icon: Bell },
  { name: 'AquaRiesgo', href: '/dashboard/risk', icon: Gauge },
  { name: 'Acciones Correctivas', href: '/dashboard/actions', icon: CheckCircle },
  { name: 'Reportes', href: '/dashboard/reports', icon: FileText },
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState(communities[0])
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary">
                <Droplets className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-bold">AquaComunidad</span>
            </Link>
            <button 
              className="lg:hidden p-1 hover:bg-sidebar-accent rounded"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/dashboard' && pathname.startsWith(item.href))
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                      {item.name === 'Alertas' && (
                        <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs">
                          3
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sm font-medium">OP</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Operador</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">Municipal</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 hover:bg-muted rounded-lg"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-foreground hidden sm:block">
                Panel de Monitoreo Comunitario
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Community selector */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                  onClick={() => setCommunityOpen(!communityOpen)}
                >
                  <Map className="w-4 h-4 text-muted-foreground" />
                  <span className="hidden sm:inline">{selectedCommunity.name}</span>
                  <span className="sm:hidden">Comunidad</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    communityOpen && "rotate-180"
                  )} />
                </button>

                {communityOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    {communities.map((community) => (
                      <button
                        key={community.id}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm hover:bg-accent transition-colors",
                          selectedCommunity.id === community.id && "bg-accent"
                        )}
                        onClick={() => {
                          setSelectedCommunity(community)
                          setCommunityOpen(false)
                        }}
                      >
                        {community.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" className="hidden sm:flex">
                Simular lectura IoT
              </Button>
              <Button size="sm">
                <span className="hidden sm:inline">Generar reporte</span>
                <FileText className="w-4 h-4 sm:hidden" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
