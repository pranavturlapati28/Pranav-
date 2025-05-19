// src/App.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Desk from './components/Desk'
import Overlay from './components/Overlay'


import { OrbitControls } from '@react-three/drei'
export default function App() {
  const [overlayVisible, setOverlayVisible] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
  <ambientLight />
  <directionalLight position={[0, 5, 5]} />
  
  {/* Enable orbit controls */}
  <OrbitControls />

  {/* Your 3D desk */}
  <Desk setOverlayVisible={setOverlayVisible} />
</Canvas>

      <Overlay visible={overlayVisible} onClose={() => setOverlayVisible(false)} />
    </div>
  )
}
