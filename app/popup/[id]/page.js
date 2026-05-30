'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PopupDetail() {
  const router = useRouter()
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [verified, setVerified] = useState(false)
  const [satisfaction, setSatisfaction] = useState(0)
  const [recommendation, setRecommendation] = useState(0)
  const [comment, setComment] = useState('')

  return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', fontFamily: 'monospace', maxWidth: '480px', margin: '0 auto', paddingBottom: '80px' }}>

      {/* 헤더 */}
      <div style={{ padding: '24px 20px 0', fontSize: '16px', letterSpacing: '3px' }}>TIMELIMITED FILE</div>
      <hr style={{ margin: '12px 0', borderColor: '#1a1a1a' }} />

      {/* 탭 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 20px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '1px' }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>🔖</div>
          <div>COLLECT</div>
        </div>
        <div onClick={() => setShowVerifyModal(true)} style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '1px', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>{verified ? '⭐' : '☆'}</div>
          <div style={{ fontWeight: verified ? 'bold' : 'normal' }}>방문 인증</div>
        </div>
        <div onClick={() => verified && setShowReviewModal(true)} style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '1px', cursor: verified ? 'pointer' : 'not-allowed', opacity: verified ? 1 : 0.4 }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>✓</div>
          <div>평가 하기</div>
        </div>
      </div>

      {/* 팝업 정보 */}
      <div style={{ padding: '20px' }}>
        {[
          ['BRAND', 'toccobo'],
          ['TITLE', '[토코보] IN MY SUN ERA IN 성수'],
          ['PRODUCT', 'SUN STICK'],
          ['DATE', '5/10 sun - 15 fri'],
          ['TIME', '10:30 - 21:00'],
          ['VENUE', '서울 성동구 연무장길 65 LECT 1F'],
          ['LINKS', 'INSTAGRAM  팝업 예약'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px dashed #999' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', minWidth: '70px' }}>{label}</span>
            <span style={{ fontSize: '13px', color: label === 'LINKS' ? '#0000EE' : '#1a1a1a' }}>{value}</span>
          </div>
        ))}

        {/* REPUTATION */}
        <div style={{ padding: '12px 0', borderBottom: '1px dashed #999' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px' }}>REPUTATION</div>
          <div style={{ fontSize: '13px', marginBottom: '8px' }}>방문 인증 인원 &nbsp;&nbsp; 153</div>
          <div style={{ fontSize: '13px', marginBottom: '4px' }}>체험 후 제품 만족도 &nbsp; BAD ————●———— GOOD</div>
          <div style={{ fontSize: '13px', marginBottom: '12px' }}>팝업 추천도 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BAD ————●—— GOOD</div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>다양한 의견</div>
          <div style={{ border: '1px solid #999', padding: '12px', height: '120px', overflowY: 'scroll', fontSize: '12px', lineHeight: '1.8' }}>
            {['팝업 기프트가 빵빵해서 좋음', '포토존이 예뻤음', '스탬프 불친절..', '사람 개많음', '제품이 생각보다 좋았음'].map((c, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                {c}<br />
                <span style={{ color: '#999' }}>-***dtc, 26.5.10 AM 10 방문 인증</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILE CLOSE */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button onClick={() => router.push('/main')} style={{ padding: '12px 32px', backgroundColor: '#FF3B30', color: 'white', border: 'none', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer' }}>
          FILE CLOSE
        </button>
      </div>

      {/* 방문 인증 모달 */}
      {showVerifyModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#0000FF', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', maxWidth: '480px', margin: '0 auto' }}>
          <p style={{ color: 'white', fontSize: '16px', textAlign: 'center', marginBottom: '8px', lineHeight: '1.6' }}>
            방문 인증이 시작되었습니다.<br />팝업 장소에서 3분 후 자동으로 인증됩니다.
          </p>
          <p style={{ color: '#FF6B6B', fontSize: '12px', marginBottom: '32px' }}>
            *GPS 허용하지 않는 경우, 인증 및 평가하기가 불가합니다.
          </p>
          <div style={{ backgroundColor: '#ADD8FF', padding: '24px', width: '200px', textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '1px', marginBottom: '12px' }}>&lt;GIFT OFFICE ITEM&gt;</div>
            <div style={{ fontSize: '64px' }}>🏺</div>
          </div>
          <button onClick={() => {
            setShowVerifyModal(false)
            setVerified(true)
          }} style={{ padding: '12px 40px', border: '2px solid white', backgroundColor: 'transparent', color: 'white', fontFamily: 'monospace', fontSize: '14px', cursor: 'pointer' }}>
            확인
          </button>
        </div>
      )}

      {/* 평가하기 모달 */}
      {showReviewModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#0000FF', display: 'flex', flexDirection: 'column', padding: '40px', maxWidth: '480px', margin: '0 auto', overflowY: 'auto' }}>
          <p style={{ color: 'white', fontSize: '16px', marginBottom: '24px', lineHeight: '1.6' }}>
            방문 인증이 완료되셨군요.<br />이제 평가가 가능합니다!
          </p>

          {[['제품 만족도', satisfaction, setSatisfaction], ['팝업 추천도', recommendation, setRecommendation]].map(([label, val, setVal], i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <div style={{ color: 'white', fontSize: '13px', marginBottom: '10px' }}>{i + 1}. 팝업에서 {label}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '11px' }}>BAD</span>
                {[1,2,3,4,5].map(n => (
                  <div key={n} onClick={() => setVal(n)} style={{ width: '28px', height: '28px', backgroundColor: val >= n ? '#FFD700' : 'white', cursor: 'pointer' }} />
                ))}
                <span style={{ color: 'white', fontSize: '11px' }}>GOOD</span>
              </div>
            </div>
          ))}

          <div style={{ color: 'white', fontSize: '13px', marginBottom: '8px' }}>3. 다양한 간단한 의견</div>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxLength={30}
            placeholder="최대 30자"
            style={{ padding: '10px', fontFamily: 'monospace', marginBottom: '24px' }}
          />

          <button onClick={() => {
            setShowReviewModal(false)
            router.push('/main')
          }} style={{ padding: '14px', border: '2px solid white', backgroundColor: 'transparent', color: 'white', fontFamily: 'monospace', fontSize: '14px', cursor: 'pointer', letterSpacing: '2px' }}>
            제출
          </button>
        </div>
      )}

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