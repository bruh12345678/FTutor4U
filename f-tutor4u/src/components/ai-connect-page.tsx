"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ai-connect-page.css"
import doNgocMinhAvatar from "../assets/do_ngoc_minh_avatar.jpg";
import kieuBaoTramAvatar from "../assets/kieu_bao_tram_avatar.jpg";
import leThiThuThanhAvatar from "../assets/le_thi_thu_thanh_avatar.jpg";
interface TutorMatch {
  id: string
  name: string
  avatar: string
  subjects: string[]
  location: string
  distance: number // in km
  rating: number
  experience: string
  price: string
  availability: string[]
  matchScore: number
  whyFit: string[]
  bio: string
  education: string
  specialties: string[]
  responseTime: string
  completedLessons: number
}

interface UserPreferences {
  subject: string
  location: string
  budget: string
  schedule: string[]
  learningStyle: string
}

interface AIConnectPageProps {
  userLocation?: { lat: number; lng: number; address: string }
}

export default function AIConnectPage({}: AIConnectPageProps) {
  const [currentTutor, setCurrentTutor] = useState<TutorMatch | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userPreferences] = useState<UserPreferences>({
    subject: "SWP",
    location: "Hòa Lạc, Hà Nội",
    budget: "1000000-1500000",
    schedule: ["evening"],
    learningStyle: "interactive",
  })
  const [tutorQueue, setTutorQueue] = useState<TutorMatch[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock tutor data
  const mockTutors: TutorMatch[] = [
    {
      id: "tutor1",
      name: "Đoàn Thị Mơ",
      avatar: doNgocMinhAvatar,
      subjects: ["MAS", "MAD", "DAP", "SWP", "PFP"],
      location: "Thạch Thất, Hà Nội",
      distance: 2.5,
      rating: 4.9,
      experience: "1 năm kinh nghiệm",
      price: "1.200.000 VNĐ/tháng",
      availability: ["Thứ 2-6: 18:00-21:00", "Cuối tuần: 14:00-18:00"],
      matchScore: 95,
      whyFit: [
        "Sinh viên xuất sắc",
        "Gần vị trí của bạn chỉ 2.5km",
        "Phong cách dạy tương tác phù hợp",
        "Thời gian rảnh trùng với lịch học của bạn",
        "Mức giá trong tầm ngân sách",
      ],
      bio: "Tôi là sinh viên năm cuối ngành Kỹ thuật phần mềm tại FPT University. Có kinh nghiệm 1 năm dạy kèm các môn lập trình, đặc biệt là SWP và PRJ. Tôi luôn tạo không khí học tập thoải mái và hiệu quả.",
      education: "FPT University - Kỹ thuật phần mềm",
      specialties: ["Java", "Spring Boot", "Database Design", "Project Management"],
      responseTime: "Thường phản hồi trong 15 phút",
      completedLessons: 3,
    },
    {
      id: "tutor2",
      name: "Kiều Bảo Trâm",
      avatar: kieuBaoTramAvatar,
      subjects: ["JPN", "MLN"],
      location: "Cầu Giấy, Hà Nội",
      distance: 8.2,
      rating: 4.8,
      experience: "2 năm kinh nghiệm",
      price: "1.100.000 VNĐ/tháng",
      availability: ["Thứ 3,5,7: 19:00-22:00", "Chủ nhật: 15:00-19:00"],
      matchScore: 87,
      whyFit: [
        "Chuyên về Mobile App Development",
        "Phương pháp dạy thực hành cao",
        "Đánh giá tốt từ học viên trước",
        "Linh hoạt về thời gian học",
      ],
      bio: "Chuyên gia phát triển ứng dụng di động với 2 năm kinh nghiệm. Tôi tập trung vào việc dạy thông qua các dự án thực tế, giúp học viên nắm vững kiến thức và ứng dụng vào công việc.",
      education: "FPT University - Kỹ thuật phần mềm",
      specialties: ["Android Development", "iOS Development", "React Native", "UI/UX Design"],
      responseTime: "Thường phản hồi trong 30 phút",
      completedLessons: 2,
    },
    {
      id: "tutor3",
      name: "Lê Thị Thu Thanh",
      avatar: leThiThuThanhAvatar,
      subjects: ["DPL", "NLP"],
      location: "Mỹ Đình, Hà Nội",
      distance: 3.5,
      rating: 4.9,
      experience: "Sinh viên xuất sắc",
      price: "1.400.000 VNĐ/tháng",
      availability: ["Thứ 2,4,6: 20:00-22:30", "Thứ 7: 16:00-20:00"],
      matchScore: 82,
      whyFit: [
        "Chuyên sâu về Database và Backend",
        "Kinh nghiệm làm việc thực tế tại công ty",
        "Phương pháp dạy có hệ thống",
        "Hỗ trợ tận tình sau giờ học",
      ],
      bio: "Backend Developer với 4 năm kinh nghiệm tại các công ty công nghệ. Tôi có thể chia sẻ kinh nghiệm thực tế và giúp học viên chuẩn bị tốt cho công việc sau này.",
      education: "FPT University - Kỹ thuật phần mềm",
      specialties: ["Database Design", "SQL Server", "C# .NET", "Web API"],
      responseTime: "Thường phản hồi trong 1 giờ",
      completedLessons: 4,
    },
  ]

  useEffect(() => {
    // Simulate AI matching process
    setIsLoading(true)
    setTimeout(() => {
      // Sort tutors by match score
      const sortedTutors = [...mockTutors].sort((a, b) => b.matchScore - a.matchScore)
      setTutorQueue(sortedTutors)
      setCurrentTutor(sortedTutors[0])
      setIsLoading(false)
    }, 2000)
  }, [userPreferences])

  const handleNextTutor = () => {
    const nextIndex = (currentIndex + 1) % tutorQueue.length
    setCurrentIndex(nextIndex)
    setCurrentTutor(tutorQueue[nextIndex])
  }

  const handlePreviousTutor = () => {
    const prevIndex = currentIndex === 0 ? tutorQueue.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setCurrentTutor(tutorQueue[prevIndex])
  }

  const handleContactTutor = () => {
    if (currentTutor) {
      // Navigate to contact page or show contact modal
      alert(
        `Liên hệ với ${currentTutor.name}!\nSố điện thoại: 0987654321\nEmail: ${currentTutor.name.toLowerCase().replace(/\s+/g, "")}@email.com`,
      )
    }
  }

  const getDistanceColor = (distance: number) => {
    if (distance <= 5) return "#10b981" // green
    if (distance <= 10) return "#f59e0b" // yellow
    return "#ef4444" // red
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "#10b981"
    if (score >= 80) return "#f59e0b"
    return "#ef4444"
  }

  if (isLoading) {
    return (
      <div className="ai-connect-page">
        <div className="ai-loading">
          <div className="loading-animation">
            <div className="ai-brain">🧠</div>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <h2>AI đang tìm gia sư phù hợp nhất...</h2>
          <p>Đang phân tích hồ sơ và tìm kiếm gia sư tốt nhất cho bạn</p>
        </div>
      </div>
    )
  }

  if (!currentTutor) {
    return (
      <div className="ai-connect-page">
        <div className="no-tutors">
          <div className="no-tutors-icon">😔</div>
          <h2>Không tìm thấy gia sư phù hợp</h2>
          <p>Hãy thử điều chỉnh tiêu chí tìm kiếm của bạn</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ai-connect-page">
      {/* Header */}
      <div className="ai-header">
        <div className="header-content">
          <h1 className="ai-title">AI Kết Nối Gia Sư</h1>

          <div className="match-indicator">
            <div className="match-score" style={{ color: getMatchScoreColor(currentTutor.matchScore) }}>
              {currentTutor.matchScore}% phù hợp
            </div>
            <div className="tutor-counter">
              {currentIndex + 1} / {tutorQueue.length}
            </div>
          </div>
        </div>
      </div>

      {/* Tutor Card */}
      <div className="tutor-showcase">
        <div className="tutor-card-ai">
          {/* Tutor Header */}
          <div className="tutor-header">
            <div className="tutor-avatar-section">
              <img
                src={currentTutor.avatar || "/placeholder.svg"}
                alt={currentTutor.name}
                className="tutor-avatar-large"
              />
              <div className="rating-badge">⭐ {currentTutor.rating}</div>
            </div>
            <div className="tutor-basic-info">
              <h2 className="tutor-name-large">{currentTutor.name}</h2>
              <p className="tutor-experience">{currentTutor.experience}</p>
              <p className="tutor-education">{currentTutor.education}</p>
              <div className="subjects-tags">
                {currentTutor.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag-ai">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="location-section">
            <div className="location-info">
              <div className="location-item">
                <span className="location-icon">📍</span>
                <div className="location-details">
                  <span className="location-label">Vị trí gia sư:</span>
                  <span className="location-value">{currentTutor.location}</span>
                </div>
              </div>
              <div className="distance-item">
                <span className="distance-icon">🚗</span>
                <div className="distance-details">
                  <span className="distance-label">Khoảng cách:</span>
                  <span className="distance-value" style={{ color: getDistanceColor(currentTutor.distance) }}>
                    {currentTutor.distance} km
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Tutor Fits */}
          <div className="fit-reasons">
            <h3 className="fit-title">🎯 Tại sao phù hợp với bạn?</h3>
            <div className="reasons-list">
              {currentTutor.whyFit.map((reason, index) => (
                <div key={index} className="reason-item">
                  <span className="reason-check">✅</span>
                  <span className="reason-text">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tutor Details */}
          <div className="tutor-details">
            <div className="detail-section">
              <h4>💰 Học phí</h4>
              <p className="price-info">{currentTutor.price}</p>
            </div>

            <div className="detail-section">
              <h4>⏰ Thời gian rảnh</h4>
              <div className="availability-list">
                {currentTutor.availability.map((time, index) => (
                  <span key={index} className="availability-item">
                    {time}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h4>🎓 Chuyên môn</h4>
              <div className="specialties-list">
                {currentTutor.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h4>📝 Giới thiệu</h4>
              <p className="tutor-bio">{currentTutor.bio}</p>
            </div>

            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-icon">📚</span>
                <div className="stat-content">
                  <span className="stat-number">{currentTutor.completedLessons}</span>
                  <span className="stat-label">Buổi học hoàn thành</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⚡</span>
                <div className="stat-content">
                  <span className="stat-text">{currentTutor.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="tutor-actions">
            <button className="action-btn secondary" onClick={handlePreviousTutor}>
              ← Gia sư trước
            </button>
            <button className="action-btn primary" onClick={handleContactTutor}>
              💬 Liên hệ ngay
            </button>
            <button className="action-btn secondary" onClick={handleNextTutor}>
              Gia sư tiếp theo →
            </button>
          </div>
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className="preferences-card">
            <h3>🎯 Tiêu chí của bạn</h3>
            <div className="preference-item">
              <span className="pref-label">Môn học:</span>
              <span className="pref-value">{userPreferences.subject}</span>
            </div>
            <div className="preference-item">
              <span className="pref-label">Khu vực:</span>
              <span className="pref-value">{userPreferences.location}</span>
            </div>
            <div className="preference-item">
              <span className="pref-label">Ngân sách:</span>
              <span className="pref-value">1-1.5 triệu VNĐ</span>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/new-class" className="quick-action-btn">
              📚 Tìm lớp học khác
            </Link>
            <Link to="/tutors" className="quick-action-btn">
              👥 Xem tất cả gia sư
            </Link>
            <Link to="/promotion" className="quick-action-btn">
              🎁 Xem ưu đãi
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
