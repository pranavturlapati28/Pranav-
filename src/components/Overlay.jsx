// src/components/Overlay.jsx
export default function Overlay({ visible, onClose }) {
    if (!visible) return null
  
    return (
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '400px',
        zIndex: 10,
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}>✕</button>
        <h2>About Me</h2>
        <p>
          Hi! I'm Pranav. I'm a software engineer and designer building interactive 3D web experiences.
        </p>
      </div>
    )
  }
  