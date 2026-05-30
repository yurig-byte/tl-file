'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div style={{
      backgroundColor: '#E8F5D0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'monospace',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: '18px',
        letterSpacing: '4px',
        marginBottom: '48px',
        fontWeight: 'normal',
      }}>
        TIMELIMITED FILE
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '240px' }}>
        {['카카오톡으로 시작하기', '네이버로 시작하기'].map(label => (
          <button key={label} onClick={() => router.push('/main')} style={btnStyle}>
            {label}
          </button>
        ))}
        <button onClick={() => router.push('/main')} style={{ ...btnStyle, fontStyle: 'italic', fontWeight: 'bold' }}>
          GOOGLE로 시작하기
        </button>
      </div>
    </div>
  )
}

const btnStyle = {
  padding: '14px',
  border: '2px solid #1a1a1a',
  backgroundColor: 'transparent',
  fontFamily: 'monospace',
  fontSize: '14px',
  cursor: 'pointer',
  letterSpacing: '1px',
}