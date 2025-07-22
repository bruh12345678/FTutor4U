"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./promotion-page.css"
import reviai_logo from "../assets/reviai_logo.png";
import educonnect_logo from "../assets/educonnect_logo.jpg";

interface PromotionSession {
  id: string
  startTime: Date
  endTime?: Date
  duration: number // in minutes
  pagesVisited: string[]
  currentPage: string
}

interface Promotion {
  id: string
  title: string
  description: string
  discount: string
  validUntil: string
  image: string
  targetPage: string
  color: string
  requirements?: {
    minActiveTime?: number // in minutes
    pagesRequired?: string[]
  }
}

interface PromotionPageProps {
  onStartSession?: (sessionId: string) => void
}

export default function PromotionPage({ onStartSession }: PromotionPageProps) {
  const [currentSession, setCurrentSession] = useState<PromotionSession | null>(null)
  const [totalActiveTime, setTotalActiveTime] = useState(0) // in minutes
  const [sessionTime, setSessionTime] = useState(0) // current session time in seconds
  const [availablePromotions, setAvailablePromotions] = useState<Promotion[]>([])

  // Mock promotions data
  const allPromotions: Promotion[] = [
    {
      id: "promo1",
      title: "Tạo quiz với AI",
      description: "Dành cho học viên học đủ 10 tiếng",
      discount: "20%",
      validUntil: "31/12/2025",
      image: reviai_logo,
      targetPage: "https://reviai.cloud/",
      color: "#10b981",
      requirements: {
        minActiveTime: 0, // 5 minutes
      },
    },
    {
      id: "promo3",
      title: "Ưu đãi kết nối gia sư bằng AI",
      description: "Trải nghiệm tính năng kết nối gia sư thông minh",
      discount: "FREE",
      validUntil: "28/08/2025",
      image: educonnect_logo,
      targetPage: "/AI-connect",
      color: "#8b5cf6",
      requirements: {
        minActiveTime: 0,
      },
    },
  ]

  // Start tracking session
  useEffect(() => {
    const sessionId = `session_${Date.now()}`
    const newSession: PromotionSession = {
      id: sessionId,
      startTime: new Date(),
      duration: 0,
      pagesVisited: [window.location.pathname],
      currentPage: window.location.pathname,
    }

    setCurrentSession(newSession)
    if (onStartSession) {
      onStartSession(sessionId)
    }

    // Load previous total active time from localStorage
    const savedActiveTime = localStorage.getItem("totalActiveTime")
    if (savedActiveTime) {
      setTotalActiveTime(Number.parseInt(savedActiveTime))
    }

    return () => {
      // Save session when component unmounts
      if (newSession) {
        const endTime = new Date()
        const duration = Math.floor((endTime.getTime() - newSession.startTime.getTime()) / 1000 / 60)
        const updatedTotalTime = totalActiveTime + duration
        localStorage.setItem("totalActiveTime", updatedTotalTime.toString())
      }
    }
  }, [])

  // Update session timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSession) {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - currentSession.startTime.getTime()) / 1000)
        setSessionTime(elapsed)

        // Update current session duration
        const durationMinutes = Math.floor(elapsed / 60)
        setCurrentSession((prev) => (prev ? { ...prev, duration: durationMinutes } : null))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentSession])

  // Check which promotions are available based on user activity
  useEffect(() => {
    const currentActiveMinutes = Math.floor(sessionTime / 60)
    const totalMinutes = totalActiveTime + currentActiveMinutes

    const available = allPromotions.filter((promo) => {
      if (promo.requirements?.minActiveTime && totalMinutes < promo.requirements.minActiveTime) {
        return false
      }
      // Add more requirement checks here if needed
      return true
    })

    setAvailablePromotions(available)
  }, [sessionTime, totalActiveTime])

  const formatMinutes = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return `${hours}h ${remainingMinutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="promotion-page">
      {/* Header */}
      <div className="promotion-header">
        <div className="header-content">
          <h1 className="promotion-title"> Ưu đãi đặc biệt</h1>

          {/* Activity Tracker */}
          <div className="activity-tracker">
            <div className="activity-stats">
              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <div className="stat-content">
                  <span className="stat-label">Tổng thời gian</span>
                  <span className="stat-value">{formatMinutes(totalActiveTime + Math.floor(sessionTime / 60))}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🎁</span>
                <div className="stat-content">
                  <span className="stat-label">Ưu đãi khả dụng</span>
                  <span className="stat-value">{availablePromotions.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="promotions-container">
        <div className="promotions-grid">
          {allPromotions.map((promo) => {
            const isAvailable = availablePromotions.some((p) => p.id === promo.id)
            const currentMinutes = totalActiveTime + Math.floor(sessionTime / 60)
            const requiredMinutes = promo.requirements?.minActiveTime || 0
            const progress = Math.min((currentMinutes / requiredMinutes) * 100, 100)

            return (
              <div key={promo.id} className={`promotion-card ${isAvailable ? "available" : "locked"}`}>
                <div className="promotion-image">
                  <img src={promo.image || "/placeholder.svg"} alt={promo.title} />
                  <div className="promotion-badge" style={{ backgroundColor: promo.color }}>
                    {promo.discount}
                  </div>
                  {!isAvailable && <div className="lock-overlay">🔒</div>}
                </div>

                <div className="promotion-content">
                  <h3 className="promotion-card-title">{promo.title}</h3>
                  <p className="promotion-description">{promo.description}</p>

                  <div className="promotion-validity">
                    <span className="validity-icon">📅</span>
                    <span>Có hiệu lực đến: {promo.validUntil}</span>
                  </div>

                  {!isAvailable && promo.requirements?.minActiveTime && (
                    <div className="unlock-progress">
                      <div className="progress-info">
                        <span>Cần thêm {requiredMinutes - currentMinutes} phút để mở khóa</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="promotion-actions">
                    {isAvailable ? (
                      <Link to={promo.targetPage} className="promotion-btn available">
                        Sử dụng ngay
                      </Link>
                    ) : (
                      <button className="promotion-btn locked" disabled>
                        Chưa đủ điều kiện
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Navigation */}
        <div className="quick-navigation">
          <h3>Khám phá thêm</h3>
          <div className="nav-links">
            <Link to="/new-class" className="nav-link">
              <span className="nav-icon">📚</span>
              <span>Tìm lớp học</span>
            </Link>
            <Link to="/tutors" className="nav-link">
              <span className="nav-icon">👨‍🏫</span>
              <span>Danh sách gia sư</span>
            </Link>
            <Link to="/AI-connect" className="nav-link">
              <span className="nav-icon">🤖</span>
              <span>AI Kết nối</span>
            </Link>
            <Link to="/register-tutor" className="nav-link">
              <span className="nav-icon">✏️</span>
              <span>Đăng ký gia sư</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
