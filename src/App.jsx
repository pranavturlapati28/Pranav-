// src/App.jsx
import React from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import Desk from './components/Desk'
import NotebookOverlay from './components/NotebookOverlay'
import './App.css';

import { OrbitControls, Loader } from '@react-three/drei'
import { Analytics } from '@vercel/analytics/react'

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 1.5, 5)
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0)
const DEFAULT_UP = new THREE.Vector3(0, 1, 0)
const DEFAULT_FOV = 45

// x/z taken from clicking the notebook's center ring directly (see the debug
// click-logger in Desk.jsx).
const NOTEBOOK_TARGET = new THREE.Vector3(-0.617, 0, 0.986)
// Roll around the view axis so the notebook's bottom edge reads parallel to
// the screen's bottom edge. Looking almost straight down makes lookAt's roll
// otherwise unstable, so we set it explicitly. Tune in 90deg steps / sign
// flip if the notebook still looks rotated.
// ROLL_TRIM is a small fine-tune on top of that: tilting the camera off
// dead-vertical (NOTEBOOK_TILT below) introduces a little perspective skew
// that a clean 90deg roll can't cancel, so nudge this in small increments
// (radians) until the page edges read level. Flip the sign if it goes the
// wrong way.
const ROLL_TRIM = -0.03
const NOTEBOOK_ROLL = 5*Math.PI/4 + ROLL_TRIM
const NOTEBOOK_UP = new THREE.Vector3(Math.sin(NOTEBOOK_ROLL), 0.0001, Math.cos(NOTEBOOK_ROLL))
// How far off dead-vertical the camera sits, in the same direction as "up"
// in the rolled frame - small values give a slight tilt instead of a pure
// straight-down shot. 0 = perfectly overhead. Increase for more tilt.
const NOTEBOOK_TILT = 0
const NOTEBOOK_CAMERA_POS = new THREE.Vector3(
  NOTEBOOK_TARGET.x + NOTEBOOK_TILT * Math.sin(NOTEBOOK_ROLL),
  1.9,
  NOTEBOOK_TARGET.z + NOTEBOOK_TILT * Math.cos(NOTEBOOK_ROLL)
)
// Narrower FOV (+ the larger distance above) flattens perspective distortion
// so a close-up top-down shot doesn't read as tilted/fisheyed.
const NOTEBOOK_FOV = 10

const DEFAULT_AMBIENT = 0.2
const NOTEBOOK_AMBIENT = 0.35

// Exponential-decay rate for the zoom ease, tuned so the animation visually
// settles in ~1200ms regardless of display refresh rate (a fixed per-frame
// lerp factor like 0.06 runs twice as fast on a 120Hz ProMotion display as on
// 60Hz, since it's applied every frame rather than every second).
const ZOOM_DECAY_RATE = 3.26

function CameraRig({ zoomed, ambientRef }) {
  const { camera } = useThree()
  const currentTarget = useRef(DEFAULT_TARGET.clone())
  const currentUp = useRef(DEFAULT_UP.clone())

  useFrame((state, delta) => {
    const t = 1 - Math.exp(-ZOOM_DECAY_RATE * delta)

    const targetPos = zoomed ? NOTEBOOK_CAMERA_POS : DEFAULT_CAMERA_POS
    const targetLook = zoomed ? NOTEBOOK_TARGET : DEFAULT_TARGET
    const targetUp = zoomed ? NOTEBOOK_UP : DEFAULT_UP
    const targetFov = zoomed ? NOTEBOOK_FOV : DEFAULT_FOV
    const targetAmbient = zoomed ? NOTEBOOK_AMBIENT : DEFAULT_AMBIENT

    camera.position.lerp(targetPos, t)
    currentTarget.current.lerp(targetLook, t)
    currentUp.current.lerp(targetUp, t).normalize()
    camera.up.copy(currentUp.current)
    camera.lookAt(currentTarget.current)
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, t)
    camera.updateProjectionMatrix()

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, t)
    }
  })

  return null
}

// Matches the ~1200ms zoom settle time (ZOOM_DECAY_RATE above) - content
// fades in after this instead of popping in the instant you click, while the
// camera is still mid-flight.
const CONTENT_REVEAL_DELAY = 1200

export default function App() {
  const [zoomed, setZoomed] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const ambientRef = useRef()

  useEffect(() => {
    if (!zoomed) {
      setShowContent(false)
      return
    }
    const timer = setTimeout(() => setShowContent(true), CONTENT_REVEAL_DELAY)
    return () => clearTimeout(timer)
  }, [zoomed])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>

      {/* Top bar */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <span className="logo">Pranav Turlapati</span>
          <div className="top-bar-right">
            <a
              href="https://www.linkedin.com/in/pranavturlapati/"
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-icon-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/pranavturlapati28"
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-icon-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:pranavturlapati02@gmail.com"
              className="top-bar-icon-link"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <button className="about-btn" onClick={() => setZoomed(true)}>
              About Me
            </button>
          </div>
        </div>
      </div>
      <div className="stage">
        <div className="stage-frame">
          <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
            <ambientLight ref={ambientRef} intensity={0.2} />

            <OrbitControls
              enabled={!zoomed}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
            />

            <CameraRig zoomed={zoomed} ambientRef={ambientRef} />

            <Suspense fallback={null}>
              <Desk onNotebookClick={() => setZoomed(true)} zoomed={zoomed} />
            </Suspense>
          </Canvas>
          <Loader />

          {zoomed && (
            <>
              <button className="back-btn" onClick={() => setZoomed(false)}>
                ← Back
              </button>
              <NotebookOverlay visible={showContent} />
            </>
          )}
        </div>
      </div>

      <Analytics />
    </div>
  )
}
