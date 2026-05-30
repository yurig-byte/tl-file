'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const ITEMS = [
  { id: 'flower', label: 'FLOWER', emoji: '🌸' },
  { id: 'cat', label: 'CAT', emoji: '🐱' },
  { id: 'table', label: 'TABLE', emoji: '🪑' },
  { id: 'window', label: 'WINDOW_SMALL', emoji: '🪟' },
]

export default function MyOffice() {
  const router = useRouter()
  const [placed, setPlaced] = useState([])
  const [dragging, setDragging] = useState(null)
  const canvasRef = useRef(null)

  const handleDragStart = (item) => {
    setDragging(item)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (!dragging) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 24
    const y = e.clientY - rect.top - 24
    setPlaced(prev => [...prev, { ...dragging, x, y, uid: Date.now() }])
    setDragging(null)
  }

  const handleDragOver = (e) => e.preventDefault()

  const removeItem = (uid) => {
    setPlaced(prev => prev.filter(p => p.uid !== uid))
  }

  return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', fontFamily: 'monospace', maxWidth: '480px', margin: '0 auto', paddingBottom: '80px' }}>

      {/* 헤더 */}
      <div style={{ padding: '24px 20px 0', fontSize: '16px', letterSpacing: '3px' }}>TIMELIMITED FILE</div>
      <hr style={{ margin: '12px 0', borderColor: '#1a1a1a' }} />

      <div style={{ padding: '0 20px 8px', fontSize: '14px', fontWeight: 'bold', fontStyle: 'italic', letterSpacing: '2px' }}>
        MY OFFICE NAME
      </div>
      <hr style={{ margin: '0 0 0', borderColor: '#1a1a1a' }} />

      {/* 캔버스 */}
      <div
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ position: 'relative', height: '360px', backgroundColor: '#E8F5D0', borderBottom: '1px dashed #999', overflow: 'hidden' }}
      >
        {placed.map(item => (
          <div
            key={item.uid}
            style={{ position: 'absolute', left: item.x, top: item.y, fontSize: '40px', cursor: 'grab', userSelect: 'none' }}
            draggable
            onDoubleClick={() => removeItem(item.uid)}
            onDragStart={(e) => {
              setDragging(item)
              setTimeout(() => removeItem(item.uid), 0)
            }}
          >
            {item.emoji}
          </div>
        ))}
        {placed.length === 0 && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
            아래 아이템을 드래그해서<br />오피스를 꾸며보세요!
          </div>
        )}
      </div>

      {/* 아이템 트레이 */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: '12px', letterSpacing: '1px', marginBottom: '12px', borderBottom: '1px dashed #999', paddingBottom: '8px' }}>
          MY ITEM | DRAG & DROP!
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {ITEMS.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              style={{ textAlign: 'center', cursor: 'grab', userSelect: 'none' }}
            >
              <div style={{ fontSize: '11px', marginBottom: '4px', letterSpacing: '1px' }}>{item.label}</div>
              <div style={{ fontSize: '36px' }}>{item.emoji}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '10px', color: '#999', marginTop: '12px' }}>
          * 아이템을 더블클릭하면 제거됩니다
        </div>
      </div>

      {/* 하단 네비 */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', backgroundColor: '#E8F5D0', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
        {[
          { label: 'SEND NEW FILE', path: '/send' },
          { label: 'COLLECTED FILE', path: '/collected' },
          { label: 'MY OFFICE', path: '/my-office' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.path)} style={{ fontSize: '10px', letterSpacing: '1px', cursor: 'pointer' }}>
            {item.label}
          </div>
        ))}
      </div>

    </div>
  )
}