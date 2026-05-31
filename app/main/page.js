'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const CITIES = ['서울', '경기', '인천']
const DISTRICTS = ['성동구', '마포구', '강남구', '용산구']
const CATEGORIES = ['팝업 스토어', '전시', '행사']

const statusStyle = {
  SOON: { backgroundColor: '#FF3B30', color: 'white' },
  OPEN: { backgroundColor: 'transparent', color: '#1a1a1a', border: '1.5px solid #1a1a1a' },
  CLOSED: { backgroundColor: '#aaa', color: 'white' },
}

export default function Main() {
  const router = useRouter()
  const [city, setCity] = useState('서울')
  const [district, setDistrict] = useState('성동구')
  const [category, setCategory] = useState('팝업 스토어')
  const [popups, setPopups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPopups()
  }, [])

  async function fetchPopups() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('popups')
        .select('*')

      console.log('data:', data)
      console.log('error:', error)

      if (error) {
        console.error('에러 상세:', JSON.stringify(error))
      } else {
        setPopups(data)
      }
    } catch (e) {
      console.error('catch 에러:', e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', fontFamily: 'monospace', paddingBottom: '80px', maxWidth: '480px', margin: '0 auto' }}>

      {/* 헤더 */}
      <div style={{ padding: '24px 20px 0', fontSize: '16px', letterSpacing: '3px' }}>
        TIMELIMITED FILE
      </div>
      <hr style={{ margin: '12px 0', borderColor: '#1a1a1a' }} />

      {/* 필터 */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #999' }}>
          <span style={{ fontSize: '12px', letterSpacing: '2px' }}>LOCATION</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select value={city} onChange={e => setCity(e.target.value)} style={selectStyle}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={district} onChange={e => setDistrict(e.target.value)} style={selectStyle}>
              {DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #999' }}>
          <span style={{ fontSize: '12px', letterSpacing: '2px' }}>SORT OF</span>
          <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* 리스트 */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '8px' }}>LIST UP</div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '12px', color: '#999' }}>
            불러오는 중...
          </div>
        ) : popups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '12px', color: '#999' }}>
            등록된 팝업이 없어요
          </div>
        ) : (
          popups.map(popup => (
            <div key={popup.id}
              onClick={() => router.push(`/popup/${popup.id}`)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0', borderBottom: '1px dashed #999', cursor: 'pointer'
              }}>
              <span style={{ fontSize: '13px', flex: 1 }}>{popup.category}</span>
              <span style={{ fontSize: '13px', flex: 1, textAlign: 'center' }}>{popup.brand}</span>
              <span style={{ fontSize: '13px', flex: 1, textAlign: 'center' }}>
                {popup.date_start?.slice(5).replace('-', '/')}-{popup.date_end?.slice(5).replace('-', '/')}
              </span>
              <span style={{
                fontSize: '10px', padding: '3px 8px', letterSpacing: '1px',
                fontWeight: 'bold', minWidth: '52px', textAlign: 'center',
                ...statusStyle[popup.status]
              }}>
                {popup.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* 하단 네비게이션 */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '480px',
        backgroundColor: '#E8F5D0', borderTop: '1px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-around', padding: '12px 0',
      }}>
        {[
          { label: 'SEND NEW FILE', path: '/send' },
          { label: 'COLLECTED FILE', path: '/collected' },
          { label: 'MY OFFICE', path: '/my-office' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.path)}
            style={{ fontSize: '10px', letterSpacing: '1px', textAlign: 'center', cursor: 'pointer' }}>
            {item.label}
          </div>
        ))}
      </div>

    </div>
  )
}

const selectStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: 'monospace',
  fontSize: '13px',
  cursor: 'pointer',
  outline: 'none',
}