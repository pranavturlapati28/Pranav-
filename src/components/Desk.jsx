import React, { useEffect, useState, useRef } from 'react'
import { useGLTF, useCursor } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'

export default function Desk({ setOverlayVisible }) {
  const { scene, nodes } = useGLTF('/desk.glb')
  const needle1Ref = useRef()
  const needle2Ref = useRef()
  const videoRef = useRef()
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const [hoveredText001, setHoveredText001] = useState(false)
  const [hoveredText002, setHoveredText002] = useState(false)
  const [hoveredText003, setHoveredText003] = useState(false)
  const [hoveredText004, setHoveredText004] = useState(false)

  const baseScale = 0.2

  const texture = useLoader(THREE.TextureLoader, '/BakedImage.png')
  const texture1 = useLoader(THREE.TextureLoader, '/BakedBricks.png', (loader) => {
    loader.manager.onError = (url) => {
      console.error(`❌ Failed to load texture from ${url}`);
    };
  });

  const angle1 = useRef(0)
  const targetAngle1 = useRef(0)

  const angle2 = useRef(0)
  const targetAngle2 = useRef(0)

  useEffect(() => {
    console.log('Loaded GLTF nodes:', nodes)
    console.log('Brick Texture loaded:', texture1)
  
    const interval = setInterval(() => {
      targetAngle1.current = Math.random() * 2 * Math.PI
      targetAngle2.current = Math.random() * 2 * Math.PI
    }, 2000)
  
    return () => clearInterval(interval)
  }, [nodes, texture1])

  useFrame(() => {
    angle1.current = THREE.MathUtils.lerp(angle1.current, targetAngle1.current, 0.05)
    angle2.current = THREE.MathUtils.lerp(angle2.current, targetAngle2.current, 0.05)

    if (needle1Ref.current) needle1Ref.current.rotation.x = angle1.current
    if (needle2Ref.current) needle2Ref.current.rotation.x = angle2.current
  })

  return (
    <group
      scale={1}
      position={[0, -1, 0]}
      rotation={[0, Math.PI * 3 / 2, 0]}
    >
      {/* 🖥 Monitor */}
      <primitive
        object={nodes.Text003}
        scale={hoveredText003 ? baseScale * 1.2 : baseScale}
        onClick={() => window.open('https://linkedin.com/in/YOUR_USERNAME', '_blank')}
        onPointerOver={() => setHoveredText003(true)}
        onPointerOut={() => setHoveredText003(false)}
      />

      {/* 🎨 Canvas */}
      <primitive
        object={nodes.Text004}
        scale={hoveredText004 ? baseScale * 1.1 : baseScale}
        onClick={() => setOverlayVisible(true)}
        onPointerOver={() => setHoveredText004(true)}
        onPointerOut={() => setHoveredText004(false)}
      />

      {/* 📓 GitHub */}
      <primitive
        object={nodes.Text001}
        scale={hoveredText001 ? baseScale * 1.1 : baseScale}
        onClick={() => window.open('https://github.com/pranavturlapati28', '_blank')}
        onPointerOver={() => setHoveredText001(true)}
        onPointerOut={() => setHoveredText001(false)}
      />

      {/* 📧 Email */}
      <primitive
        object={nodes.Text002}
        scale={hoveredText002 ? baseScale * 1.1 : baseScale}
        onClick={() => window.open('mailto:pranavturlapati02@gmail.com')}
        onPointerOver={() => setHoveredText002(true)}
        onPointerOut={() => setHoveredText002(false)}
      />

      {/* 💻 Video overlays */}
      <Html
        transform
        position={[0.511684, 1.25526, .132756]}
        rotation={[0, Math.PI * 1.5, 0]}
        distanceFactor={1.5}
      >
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '70px',
            borderRadius: '4px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Html>

      <Html
        transform
        position={[0.511684, 1.39526, .132756]}
        rotation={[0, Math.PI * 1.5, 0]}
        distanceFactor={1.5}
      >
        <video
          src="/basket.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '50px',
            borderRadius: '4px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Html>

      {/* 🔁 Needle animation */}
      <primitive ref={needle1Ref} object={nodes.Cube136} />
      <primitive ref={needle2Ref} object={nodes.Cube137} />

      <primitive object={scene} />
    </group>
  )
}
