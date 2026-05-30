'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CITIES = ['서울', '경기', '인천']
const DISTRICTS = ['성동구', '마포구', '강남구', '용산구']
const CATEGORIES = ['팝업 스토어', '전시', '행사']

export default function SendNewFile() {
  const router = useRouter()
  const [city, setCity] = useState('서울')
  const [district, setDistrict] = useState('성동구')
  const [category, setCategory] = useState('팝업 스토어')
  const [brand, setBrand] = useState('')
  const [link, setLink] = useState('')
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)

  return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', fontFamily: 'monospace', maxWidth: '480px', margin: '0 auto', paddingBottom: '80px' }}>

      {/* 헤더 */}
      <div style={{ padding: '24px 20px 0', fontSize: '16px', letterSpacing: '3px' }}>TIMELIMITED FILE</div>
      <hr style={{ margin: '12px 0', borderColor: '#1a1a1a' }} />

      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>SEND NEW FILE</div>
        <div style={{ fontSize: '12px', marginBottom: '16px', borderBottom: '1px solid #1a1a1a', paddingBottom: '12px' }}>
          다양한 행사, 팝업, 전시 등의 정보를 받고 있습니다!
        </div>

        {/* 필터 */}
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

        {/* 입력 폼 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #999' }}>
          <span style={{ fontSize: '12px' }}>브랜드명</span>
          <input value={brand} onChange={e => setBrand(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #999' }}>
          <span style={{ fontSize: '12px' }}>관련 링크</span>
          <input value={link} onChange={e => setLink(e.target.value)} style={inputStyle} />
        </div>

        {/* 안내 박스 */}
        <div style={{ backgroundColor: '#ADD8FF', padding: '16px', margin: '16px 0', fontSize: '12px', lineHeight: '1.8' }}>
          <div style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '8px' }}>@TL FILE TEAM</div>
          기존 리스트업에 없던 정보를 많이 제보해주시는 분들께<br />
          한달에 3분씩 커피 기프티콘을 전달드립니다!<br />
          희망하신다면, 아래에 휴대폰 번호 입력 및 개인정보 이용 동의 부탁드립니다. :)
          <div style={{ color: '#FF3B30', marginTop: '8px', fontSize: '11px' }}>*매달 월초에 발송 예정</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <span style={{ fontSize: '12px' }}>휴대폰 번호</span>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="010-0000-0000"
              style={{ flex: 1, padding: '8px', fontFamily: 'monospace', fontSize: '12px', border: '1px solid #1a1a1a' }} />
            <button style={{ padding: '8px 12px', backgroundColor: '#0000FF', color: 'white', border: 'none', fontFamily: 'monospace', fontSize: '11px', cursor: 'pointer' }}>
              인증하기
            </button>
          </div>

          <div style={{ marginTop: '12px', fontSize: '11px', lineHeight: '1.8' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>개인정보 이용 동의</div>
            수집항목 : 휴대폰 번호<br />
            수집목적 : 기프티콘 발송<br />
            수집기간 : 기프티콘 발송 후 즉시 정보 삭제
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>동의합니다.</span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button onClick={() => router.push('/main')} style={{ width: '100%', padding: '14px', border: '2px solid #1a1a1a', backgroundColor: 'transparent', fontFamily: 'monospace', fontSize: '14px', letterSpacing: '2px', cursor: 'pointer' }}>
          제출
        </button>
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

const selectStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: 'monospace',
  fontSize: '13px',
  cursor: 'pointer',
  outline: 'none',
}

const inputStyle = {
  width: '200px',
  padding: '6px 10px',
  border: '1px solid #1a1a1a',
  backgroundColor: 'transparent',
  fontFamily: 'monospace',
  fontSize: '12px',
  outline: 'none',
}