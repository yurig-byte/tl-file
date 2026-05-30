'use client'
import { useRouter } from 'next/navigation'

const mockCollected = [
  { id: 1, category: 'BEAUTY_skincare', brand: 'toccobo', date: '5/10-15' },
  { id: 2, category: 'BEAUTY_skincare', brand: 'toccobo', date: '5/10-15' },
  { id: 3, category: 'BEAUTY_skincare', brand: 'toccobo', date: '5/10-15' },
  { id: 4, category: 'BEAUTY_skincare', brand: 'toccobo', date: '5/10-15' },
  { id: 5, category: 'BEAUTY_skincare', brand: 'toccobo', date: '5/10-15' },
  { id: 6, category: 'BEAUTY_skincare', brand: 'toccobo', date: '5/10-15' },
]

export default function CollectedFile() {
  const router = useRouter()

  return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', fontFamily: 'monospace', maxWidth: '480px', margin: '0 auto', paddingBottom: '80px' }}>

      {/* 헤더 */}
      <div style={{ padding: '24px 20px 0', fontSize: '16px', letterSpacing: '3px' }}>TIMELIMITED FILE</div>
      <hr style={{ margin: '12px 0', borderColor: '#1a1a1a' }} />

      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', fontStyle: 'italic', letterSpacing: '2px', marginBottom: '16px', borderBottom: '1px solid #1a1a1a', paddingBottom: '12px' }}>
          COLLECTED FILE
        </div>

        <div style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '8px' }}>LIST UP</div>

        {mockCollected.map(item => (
          <div key={item.id}
            onClick={() => router.push(`/popup/${item.id}`)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px dashed #999', cursor: 'pointer' }}>
            <span style={{ fontSize: '13px', flex: 1 }}>{item.category}</span>
            <span style={{ fontSize: '13px', flex: 1, textAlign: 'center' }}>{item.brand}</span>
            <span style={{ fontSize: '13px', flex: 1, textAlign: 'center' }}>{item.date}</span>
            <span style={{ fontSize: '10px', padding: '3px 8px', backgroundColor: '#888', color: 'white', letterSpacing: '1px', fontWeight: 'bold' }}>
              CLOSED
            </span>
          </div>
        ))}
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