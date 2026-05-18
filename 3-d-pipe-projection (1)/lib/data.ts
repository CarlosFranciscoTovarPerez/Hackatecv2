// Datos de ejemplo para AquaComunidad

export type RiskLevel = 'stable' | 'review' | 'high' | 'critical' | 'offline'

export interface WaterPoint {
  id: string
  name: string
  type: 'well' | 'tank' | 'school' | 'health' | 'residential' | 'supply'
  status: RiskLevel
  aquaRisk: number
  waterLevel: number
  autonomy: number
  turbidity: 'low' | 'medium' | 'high'
  ph: number
  tds: number
  temperature: number
  chlorine: 'low' | 'normal' | 'high'
  pressure: 'low' | 'normal' | 'high'
  lastReading: string
  coordinates: { x: number; y: number }
}

export interface Alert {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  pointId: string
  pointName: string
  cause: string
  time: string
  status: 'active' | 'in-progress' | 'resolved'
  recommendation: string
}

export interface CorrectiveAction {
  id: string
  alertId: string
  action: string
  responsible: string
  date: string
  evidence?: string
  status: 'pending' | 'in-progress' | 'resolved'
  newReading?: string
}

export const communities = [
  { id: 'cedral', name: 'Comunidad El Cedral' },
  { id: 'esperanza', name: 'Colonia La Esperanza' },
  { id: 'valle', name: 'Ejido Valle Verde' },
]

export const waterPoints: WaterPoint[] = [
  {
    id: 'pozo-principal',
    name: 'Pozo Principal',
    type: 'well',
    status: 'critical',
    aquaRisk: 78,
    waterLevel: 24,
    autonomy: 2.8,
    turbidity: 'high',
    ph: 6.4,
    tds: 480,
    temperature: 31,
    chlorine: 'low',
    pressure: 'low',
    lastReading: 'hace 2 min',
    coordinates: { x: 30, y: 25 }
  },
  {
    id: 'tinaco-comunitario',
    name: 'Tinaco Comunitario',
    type: 'tank',
    status: 'stable',
    aquaRisk: 25,
    waterLevel: 85,
    autonomy: 8.5,
    turbidity: 'low',
    ph: 7.2,
    tds: 320,
    temperature: 26,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'hace 5 min',
    coordinates: { x: 45, y: 40 }
  },
  {
    id: 'escuela-primaria',
    name: 'Escuela Primaria',
    type: 'school',
    status: 'review',
    aquaRisk: 52,
    waterLevel: 62,
    autonomy: 4.2,
    turbidity: 'medium',
    ph: 7.0,
    tds: 380,
    temperature: 28,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'hace 3 min',
    coordinates: { x: 60, y: 55 }
  },
  {
    id: 'centro-salud',
    name: 'Centro de Salud',
    type: 'health',
    status: 'stable',
    aquaRisk: 18,
    waterLevel: 92,
    autonomy: 12.3,
    turbidity: 'low',
    ph: 7.4,
    tds: 290,
    temperature: 24,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'hace 1 min',
    coordinates: { x: 55, y: 30 }
  },
  {
    id: 'zona-norte',
    name: 'Zona Habitacional Norte',
    type: 'residential',
    status: 'high',
    aquaRisk: 65,
    waterLevel: 38,
    autonomy: 3.1,
    turbidity: 'low',
    ph: 7.1,
    tds: 350,
    temperature: 27,
    chlorine: 'normal',
    pressure: 'low',
    lastReading: 'hace 4 min',
    coordinates: { x: 75, y: 20 }
  },
  {
    id: 'punto-pipa',
    name: 'Punto de Pipa',
    type: 'supply',
    status: 'offline',
    aquaRisk: 0,
    waterLevel: 0,
    autonomy: 0,
    turbidity: 'low',
    ph: 0,
    tds: 0,
    temperature: 0,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'sin conexión',
    coordinates: { x: 20, y: 65 }
  }
]

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    pointId: 'pozo-principal',
    pointName: 'Pozo Principal',
    cause: 'Nivel bajo + turbidez alta + cloro bajo',
    time: 'hace 15 min',
    status: 'active',
    recommendation: 'Enviar brigada, revisar cloración y abastecer con pipa.'
  },
  {
    id: 'alert-2',
    severity: 'high',
    pointId: 'zona-norte',
    pointName: 'Zona Habitacional Norte',
    cause: 'Presión baja y posible fuga',
    time: 'hace 45 min',
    status: 'in-progress',
    recommendation: 'Revisar tubería y comparar caudal de entrada/salida.'
  },
  {
    id: 'alert-3',
    severity: 'medium',
    pointId: 'escuela-primaria',
    pointName: 'Escuela Primaria',
    cause: 'Turbidez elevada',
    time: 'hace 2 horas',
    status: 'active',
    recommendation: 'Limpiar tinaco y repetir medición.'
  }
]

export const correctiveActions: CorrectiveAction[] = [
  {
    id: 'action-1',
    alertId: 'alert-1',
    action: 'Se realizó limpieza de tinaco, cloración preventiva y revisión de válvula de entrada.',
    responsible: 'Juan Pérez - Operador de agua',
    date: '2024-01-15',
    status: 'in-progress'
  },
  {
    id: 'action-2',
    alertId: 'alert-2',
    action: 'Inspección de tubería en zona norte programada.',
    responsible: 'María García - Técnico municipal',
    date: '2024-01-15',
    status: 'pending'
  }
]

export const waterLevelHistory = [
  { day: 'Lun', level: 78 },
  { day: 'Mar', level: 72 },
  { day: 'Mié', level: 65 },
  { day: 'Jue', level: 58 },
  { day: 'Vie', level: 45 },
  { day: 'Sáb', level: 32 },
  { day: 'Hoy', level: 24 },
]

export const alertsByType = [
  { type: 'Nivel bajo', count: 5 },
  { type: 'Turbidez', count: 3 },
  { type: 'Cloro bajo', count: 2 },
  { type: 'Presión baja', count: 4 },
  { type: 'Reporte ciudadano', count: 2 },
]

export function getRiskColor(status: RiskLevel): string {
  switch (status) {
    case 'stable': return 'bg-success text-success-foreground'
    case 'review': return 'bg-warning text-warning-foreground'
    case 'high': return 'bg-danger text-danger-foreground'
    case 'critical': return 'bg-destructive text-destructive-foreground'
    case 'offline': return 'bg-muted text-muted-foreground'
  }
}

export function getRiskBorderColor(status: RiskLevel): string {
  switch (status) {
    case 'stable': return 'border-success'
    case 'review': return 'border-warning'
    case 'high': return 'border-danger'
    case 'critical': return 'border-destructive'
    case 'offline': return 'border-muted'
  }
}

export function getSeverityColor(severity: Alert['severity']): string {
  switch (severity) {
    case 'critical': return 'bg-destructive text-destructive-foreground'
    case 'high': return 'bg-danger text-danger-foreground'
    case 'medium': return 'bg-warning text-warning-foreground'
    case 'low': return 'bg-success text-success-foreground'
  }
}

export function getStatusLabel(status: RiskLevel): string {
  switch (status) {
    case 'stable': return 'Estable'
    case 'review': return 'En revisión'
    case 'high': return 'Riesgo alto'
    case 'critical': return 'Crítico'
    case 'offline': return 'Sin conexión'
  }
}
