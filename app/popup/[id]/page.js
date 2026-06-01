'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function PopupDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [popup, setPopup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])

const GIFT_ITEMS = [
  '/items/item-01.svg',
  '/items/item-02.svg',
  '/items/item-03.svg',
]

const [giftItem] = useState(() => GIFT_ITEMS[Math.floor(Math.random() * GIFT_ITEMS.length)])
  // 버튼 상태
  const [collected, setCollected] = useState(false)
  const [verified, setVerified] = useState(false)
  const [reviewed, setReviewed] = useState(false)

  // 모달
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  // 평가 입력값
  const [satisfaction, setSatisfaction] = useState(0)
  const [recommendation, setRecommendation] = useState(0)
  const [comment, setComment] = useState('')

  const timerRef = useRef(null)

  useEffect(() => {
    fetchPopup()
    fetchReviews()
  }, [id])

  async function fetchPopup() {
    setLoading(true)
    const { data, error } = await supabase
      .from('popups').select('*').eq('id', id).single()
    if (!error) setPopup(data)
    setLoading(false)
  }

  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews').select('*').eq('popup_id', id).order('created_at', { ascending: false })
    if (data) setReviews(data)
  }

  // 방문 인증 시작 — GPS 확인 후 3분 타이머
  function startVerify() {
    setShowVerifyModal(true)
    setVerifying(true)
    if (!navigator.geolocation) {
      alert('GPS를 지원하지 않는 기기예요.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        // 팝업 위치: 서울 성동구 연무장길 65 (위도/경도)
        const targetLat = 37.366801
        const targetLng = 126.728897
        const dist = getDistance(latitude, longitude, targetLat, targetLng)
        if (dist <= 300) {
          // 300m 이내면 3분 타이머 시작
          timerRef.current = setTimeout(() => {
            setVerified(true)
            setVerifying(false)
          }, 3 * 60 * 1000)
        } else {
          alert('팝업 장소 근처에 있어야 인증이 가능해요.')
          setVerifying(false)
        }
      },
      () => {
        alert('GPS 권한을 허용해주세요.')
        setVerifying(false)
      }
    )
  }

  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }

  async function submitReview() {
    if (satisfaction === 0 || recommendation === 0 || comment.trim() === '') {
      alert('모든 항목을 작성해주세요.')
      return
    }
    const { error } = await supabase.from('reviews').insert({
      popup_id: id,
      product_satisfaction: satisfaction,
      popup_recommendation: recommendation,
      comment: comment.trim(),
    })
    if (!error) {
      setReviewed(true)
      setShowReviewModal(false)
      fetchReviews()
    } else {
      alert('제출 중 오류가 발생했어요.')
    }
  }

  if (loading) return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#999' }}>
      불러오는 중...
    </div>
  )
  if (!popup) return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#999' }}>
      파일을 찾을 수 없어요
    </div>
  )

  const dateStart = popup.date_start?.slice(5).replace('-', '/')
  const dateEnd = popup.date_end?.slice(5).replace('-', '/')

  return (
    <div style={{ backgroundColor: '#E8F5D0', minHeight: '100vh', maxWidth: '480px', margin: '0 auto', paddingBottom: '80px' }}>

      {/* 헤더 */}
      <div style={{ padding: '24px 20px 0', fontSize: '16px'}}>TIMELIMITED FILE</div>
      <hr style={{ margin: '12px 0', borderColor: '#1a1a1a' }} />

      {/* 탭 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 20px', borderBottom: '1px solid #1a1a1a' }}>
        <div onClick={() => setCollected(true)} style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '1px', cursor: 'pointer' }}>
          <img src={collected ? '/button-collectcomplt.svg' : '/button-collect.svg'} style={{ width: '36px', height: '36px', objectFit: 'contain', display: 'block', margin: '0 auto 4px' }} />
          <div>COLLECT</div>
        </div>
        <div onClick={() => !verified && !verifying && startVerify()} style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '1px', cursor: verified ? 'default' : 'pointer' }}>
          <img src={verified ? '/button-visitcomplt.svg' : '/button-visit.svg'} style={{ width: '36px', height: '36px', objectFit: 'contain', display: 'block', margin: '0 auto 4px' }} />
          <div>방문 인증</div>
        </div>
        <div onClick={() => verified && !reviewed && setShowReviewModal(true)} style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '1px', cursor: verified && !reviewed ? 'pointer' : 'not-allowed', opacity: verified ? 1 : 0.4 }}>
          <img src={reviewed ? '/button-checkcomplt.svg' : '/button-check.svg'} style={{ width: '36px', height: '36px', objectFit: 'contain', display: 'block', margin: '0 auto 4px' }} />
          <div>평가 하기</div>
        </div>
      </div>

      {/* 팝업 정보 */}
      <div style={{ padding: '20px' }}>
        {[
          ['BRAND', popup.brand],
          ['TITLE', popup.title],
          ['PRODUCT', popup.product_name],
          ['DATE', `${dateStart} - ${dateEnd}`],
          ['TIME', `${popup.time_open} - ${popup.time_close}`],
          ['VENUE', popup.venue],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px dashed #999' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', minWidth: '70px' }}>{label}</span>
            <span style={{ fontSize: '13px' }}>{value}</span>
          </div>
        ))}

        {/* LINKS */}
        <div style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px dashed #999' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', minWidth: '70px' }}>LINKS</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {popup.instagram_url && <a href={popup.instagram_url} target="_blank" style={{ fontSize: '13px', color: '#0000EE' }}>INSTAGRAM</a>}
            {popup.reservation_url && <a href={popup.reservation_url} target="_blank" style={{ fontSize: '13px', color: '#0000EE' }}>팝업 예약</a>}
          </div>
        </div>

        {/* REPUTATION */}
        <div style={{ padding: '12px 0' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px' }}>REPUTATION</div>
          <div style={{ fontSize: '13px', marginBottom: '8px' }}>방문 인증 인원 &nbsp;&nbsp; {reviews.length}</div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>다양한 의견</div>
          <div style={{ border: '1px solid #999', padding: '12px', height: '160px', overflowY: 'scroll', fontSize: '12px', lineHeight: '1.8' }}>
            {reviews.length === 0 ? (
              <div style={{ color: '#999' }}>아직 의견이 없어요</div>
            ) : reviews.map((r) => (
              <div key={r.id} style={{ marginBottom: '12px' }}>
                <div>{r.comment}</div>
                <div style={{ color: '#999', fontSize: '11px' }}>
                  만족도 {r.product_satisfaction}/5 · 추천도 {r.popup_recommendation}/5 · {r.created_at?.slice(0,10)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILE CLOSE */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button onClick={() => router.push('/main')} style={{ padding: '12px 32px', backgroundColor: '#FF3B30', color: 'white', border: 'none', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer', fontStyle: 'italic', fontWeight: 'bold' }}>
          FILE CLOSE
        </button>
      </div>

      {/* 방문 인증 모달 */}
      {showVerifyModal && (
        <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: '#0000FF', display: 'flex', flexDirection: 'column', padding: '40px', overflowY: 'auto', zIndex: 1000}}>
          <span onClick={() => setShowReviewModal(false)}
      style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', fontSize: '20px', cursor: 'pointer' }}>✕</span>
          <p style={{ color: 'white', fontSize: '16px', textAlign: 'center', marginBottom: '8px', lineHeight: '1.6' }}>
            방문 인증이 시작되었습니다.<br />팝업 장소에서 3분 후 자동으로 인증됩니다.
          </p>
          <p style={{ color: '#FF6B6B', fontSize: '12px', marginBottom: '32px' }}>
            *GPS 허용하지 않는 경우, 인증 및 평가하기가 불가합니다.
          </p>
          <div style={{ backgroundColor: '#ADD8FF', padding: '24px', width: '200px', textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', letterSpacing: '1px', marginBottom: '12px' }}>&lt;GIFT OFFICE ITEM&gt;</div>
            <img src={giftItem} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
          </div>
          <button onClick={() => setShowVerifyModal(false)}
            style={{ padding: '12px 40px', border: '2px solid white', backgroundColor: 'transparent', color: 'white', fontSize: '14px', cursor: 'pointer' }}>
            확인
          </button>
        </div>
      )}

      {/* 평가하기 모달 */}
      {showReviewModal && (
        <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: '#0000FF', display: 'flex', flexDirection: 'column', padding: '40px', overflowY: 'auto', zIndex: 1000 }}>
          <span onClick={() => setShowReviewModal(false)}
      style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', fontSize: '20px', cursor: 'pointer' }}>✕</span>
          <p style={{ color: 'white', fontSize: '16px', marginBottom: '24px', lineHeight: '1.6' }}>
            방문 인증이 완료되셨군요.<br />이제 평가가 가능합니다!
          </p>
          {[['제품 만족도', satisfaction, setSatisfaction], ['팝업 추천도', recommendation, setRecommendation]].map(([label, val, setVal], i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <div style={{ color: 'white', fontSize: '13px', marginBottom: '10px' }}>{i + 1}. 팝업에서 {label}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '11px' }}>BAD</span>
                {[1,2,3,4,5].map(n => (
                  <div key={n} onClick={() => setVal(n)}
                    style={{ width: '28px', height: '28px', backgroundColor: val >= n ? '#FFD700' : 'white', cursor: 'pointer' }} />
                ))}
                <span style={{ color: 'white', fontSize: '11px' }}>GOOD</span>
              </div>
            </div>
          ))}
          <div style={{ color: 'white', fontSize: '13px', marginBottom: '8px' }}>3. 다양한 간단한 의견</div>
          <p style={{ color: '#ccc', fontSize: '11px', marginBottom: '4px' }}>*최대 30자까지 작성 가능합니다.</p>
          <input value={comment} onChange={e => setComment(e.target.value)} maxLength={30}
            style={{ padding: '10px', marginBottom: '8px' }} />
          <p style={{ color: '#ccc', fontSize: '11px', marginBottom: '24px' }}>*의도적인 비방, 욕설의 경우 동의 없이 삭제될 예정입니다.</p>
          <button onClick={submitReview}
            style={{ padding: '14px', border: '2px solid white', backgroundColor: 'transparent', color: 'white', fontSize: '14px', cursor: 'pointer', letterSpacing: '2px' }}>
            제출
          </button>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', backgroundColor: '#E8F5D0', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
        {[
          { label: 'HOME', path: '/main', img: '/button-home.svg' },
          { label: 'SEND NEW FILE', path: '/send', img: '/button-sendnewfile.svg' },
          { label: 'COLLECTED FILE', path: '/collected', img: '/button-collectedfile.svg' },
          { label: 'MY OFFICE', path: '/my-office', img: '/button-myoffice.svg' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.path)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <img src={item.img} alt={item.label} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.5px', textAlign: 'center' }}>{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}