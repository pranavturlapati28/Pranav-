import React, { useEffect, useState } from 'react'
import { useGLTF, useCursor } from '@react-three/drei'

export default function Desk({ setOverlayVisible }) {
  const { scene, nodes } = useGLTF('/desk.glb')
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useEffect(() => {
    console.log('Loaded GLTF nodes:', nodes)
  }, [nodes])

  return (
    <group
      scale={1}
      position={[0, -1, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      {/* 🖥 Monitor */}
      <primitive
        object={nodes.Cube004}
        onClick={() => window.open('https://github.com/YOUR_USERNAME', '_blank')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {/* 🎨 Canvas */}
      <primitive
        object={nodes.Cube014}
        onClick={() => setOverlayVisible(true)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {/* 📓 Notebook */}
      <primitive
        object={nodes.Cube122}
        onClick={() => window.open('https://linkedin.com/in/YOUR_USERNAME', '_blank')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {/* Render the rest of the scene normally */}
      <primitive object={scene} />
    </group>
  )
}
