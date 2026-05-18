'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'

// Datos de sensores en la tubería
const sensorData = [
  { id: 'sensor-1', name: 'Entrada Principal', position: [-4, 0, 0] as [number, number, number], status: 'active' as const, reading: '7.2 pH' },
  { id: 'sensor-2', name: 'Presión Zona A', position: [-1.5, 0, 0] as [number, number, number], status: 'active' as const, reading: '2.1 bar' },
  { id: 'sensor-3', name: 'Flujo Central', position: [1, 0, 0] as [number, number, number], status: 'warning' as const, reading: '45 L/min' },
  { id: 'sensor-4', name: 'Turbidez', position: [3.5, 0, 0] as [number, number, number], status: 'active' as const, reading: '0.8 NTU' },
  { id: 'sensor-5', name: 'Salida Comunitaria', position: [5.5, 0, 0] as [number, number, number], status: 'active' as const, reading: '6.9 pH' },
]

type SensorStatus = 'active' | 'warning' | 'offline'

// Componente de sensor con parpadeo
function Sensor({ position, status, name, reading }: { 
  position: [number, number, number]
  status: SensorStatus
  name: string
  reading: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  
  const color = useMemo(() => {
    switch (status) {
      case 'active': return '#22c55e'
      case 'warning': return '#f59e0b'
      case 'offline': return '#6b7280'
    }
  }, [status])

  useFrame((state) => {
    if (meshRef.current && glowRef.current && lightRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5
      const intensity = status === 'offline' ? 0.2 : 0.5 + pulse * 0.5
      
      glowRef.current.scale.setScalar(1 + pulse * 0.3)
      lightRef.current.intensity = status === 'offline' ? 0.1 : intensity * 2
      
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = intensity
    }
  })

  return (
    <group position={position}>
      {/* Base del sensor */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Cuerpo del sensor */}
      <mesh ref={meshRef} position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Resplandor exterior */}
      <mesh ref={glowRef} position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Luz puntual */}
      <pointLight 
        ref={lightRef}
        position={[0, 0.95, 0]} 
        color={color} 
        intensity={1} 
        distance={2}
      />

      {/* Etiqueta HTML */}
      <Html position={[0, 1.5, 0]} center distanceFactor={8}>
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg px-2 py-1 shadow-lg whitespace-nowrap">
          <p className="text-[10px] font-medium text-white">{name}</p>
          <p className="text-[9px] text-slate-400">{reading}</p>
        </div>
      </Html>
    </group>
  )
}

// Componente de tubería
function Pipeline() {
  const pipeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 0, 0),
      new THREE.Vector3(-3, 0.2, 0.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, -0.2, -0.3),
      new THREE.Vector3(6, 0, 0),
    ])
    return new THREE.TubeGeometry(curve, 64, 0.35, 16, false)
  }, [])

  const innerPipeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 0, 0),
      new THREE.Vector3(-3, 0.2, 0.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, -0.2, -0.3),
      new THREE.Vector3(6, 0, 0),
    ])
    return new THREE.TubeGeometry(curve, 64, 0.28, 16, false)
  }, [])

  return (
    <group>
      {/* Tubería principal */}
      <mesh geometry={pipeGeometry}>
        <meshStandardMaterial 
          color="#0ea5e9"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Interior de la tubería */}
      <mesh geometry={innerPipeGeometry}>
        <meshStandardMaterial 
          color="#0369a1"
          metalness={0.4}
          roughness={0.5}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Juntas/uniones de la tubería */}
      {[-4, -1.5, 1, 3.5, 5.5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <torusGeometry args={[0.4, 0.08, 16, 32]} />
          <meshStandardMaterial 
            color="#64748b"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Tapas de los extremos */}
      <mesh position={[-6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

// Partículas de agua fluyendo
function WaterParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4
    }
    return pos
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += 0.03
        if (posArray[i * 3] > 6) {
          posArray[i * 3] = -6
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Escena principal
function Scene() {
  return (
    <>
      <OrbitControls 
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
      
      {/* Iluminación */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />
      
      {/* Tubería */}
      <Pipeline />
      
      {/* Partículas de agua */}
      <WaterParticles />
      
      {/* Sensores */}
      {sensorData.map((sensor) => (
        <Sensor 
          key={sensor.id}
          position={sensor.position}
          status={sensor.status}
          name={sensor.name}
          reading={sensor.reading}
        />
      ))}

      {/* Etiquetas de dirección */}
      <Html position={[-6, -1, 0]} center>
        <span className="text-xs font-bold text-slate-400 tracking-wider">ENTRADA</span>
      </Html>
      <Html position={[6, -1, 0]} center>
        <span className="text-xs font-bold text-slate-400 tracking-wider">SALIDA</span>
      </Html>

      {/* Suelo con grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.3} />
      </mesh>
      <gridHelper args={[20, 20, '#334155', '#1e293b']} position={[0, -1.49, 0]} />
    </>
  )
}

export function Pipeline3DViewer() {
  return (
    <Card className="bg-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg">
            <Activity className="w-5 h-5 text-primary" />
            Visualización 3D - Sistema de Tuberías
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              5 sensores activos
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-[400px]" style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}>
          <Canvas
            camera={{ position: [0, 4, 10], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
            style={{ width: '100%', height: '100%' }}
          >
            <color attach="background" args={['#0f172a']} />
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
        {/* Leyenda */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted-foreground">Sensor activo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-muted-foreground">Atención requerida</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-muted-foreground">Sin conexión</span>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              Arrastra para rotar - Scroll para zoom
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
