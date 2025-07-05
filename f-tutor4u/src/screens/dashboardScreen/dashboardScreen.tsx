"use client"

import { useState, useEffect } from "react"
import "./dashboardScreen.css"

interface AnalyticsData {
  totalUsers: number
  totalTutors: number
  totalClasses: number
  totalRevenue: number
  monthlySignups: Array<{ month: string; users: number; tutors: number }>
  recentActivities: Array<{
    id: string
    type: "signup" | "class_created" | "payment" | "tutor_registered"
    user: string
    description: string
    timestamp: string
  }>
  topSubjects: Array<{ subject: string; count: number }>
  userGrowth: Array<{ date: string; users: number }>
}

interface AnalyticsDashboardProps {
  onLogout: () => void
  userName?: string
}

export default function AnalyticsDashboard({ onLogout, userName }: AnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockData: AnalyticsData = {
          totalUsers: 48,
          totalTutors: 34,
          totalClasses: 9,
          totalRevenue: 16090000,
          monthlySignups: [
            { month: "Jan", users: 0, tutors: 0 },
            { month: "Feb", users: 0, tutors: 0 },
            { month: "Mar", users: 0, tutors: 0 },
            { month: "Apr", users: 0, tutors: 0 },
            { month: "May", users: 6, tutors: 12 },
            { month: "Jun", users: 14, tutors: 34 },
          ],
          recentActivities: [
            {
              id: "1",
              type: "signup",
              user: "Nguyễn Thượng Quyền",
              description: "Đăng ký tài khoản gia sư",
              timestamp: "10 giờ trước",
            },
            {
              id: "2",
              type: "class_created",
              user: "Trần Quang Khải",
              description: "Đăng ký học môn MAE",
              timestamp: "3 ngày trước",
            },
            {
              id: "3",
              type: "class_created",
              user: "Trần Quang Khải",
              description: "Đăng ký học môn PRF",
              timestamp: "3 ngày trước",
            },
            {
              id: "4",
              type: "class_created",
              user: "Trần Quang Khải",
              description: "Đăng ký học môn MAD",
              timestamp: "3 ngày trước",
            },
          ],
          topSubjects: [
            { subject: "FIN", count: 3 },
            { subject: "FIM", count: 2 },
            { subject: "ACC", count: 2 },
            { subject: "MAE", count: 1 },
            { subject: "PRF", count: 1 },
          ],
          userGrowth: [
            { date: "2024-03-01", users: 10 },
            { date: "2024-03-08", users: 20 },
            { date: "2024-03-15", users: 30 },
            { date: "2024-03-22", users: 40 },
          ],
        }

        setAnalyticsData(mockData)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [selectedTimeRange])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "signup":
        return "👤"
      case "class_created":
        return "📚"
      case "payment":
        return "💰"
      case "tutor_registered":
        return "👨‍🏫"
      default:
        return "📋"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="analytics-dashboard">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu analytics...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="analytics-dashboard">
        <div className="dashboard-error">
          <div className="error-icon">⚠️</div>
          <h3>Không thể tải dữ liệu</h3>
          <p>Có lỗi xảy ra khi tải dữ liệu analytics.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Analytics Dashboard</h1>
            <p className="dashboard-subtitle">Tổng quan hoạt động hệ thống</p>
          </div>
          <div className="header-right">
            <div className="time-range-selector">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="time-range-select"
              >
                <option value="7d">7 ngày qua</option>
                <option value="30d">30 ngày qua</option>
                <option value="90d">3 tháng qua</option>
                <option value="1y">1 năm qua</option>
              </select>
            </div>
            <div className="admin-info">
              <span className="admin-name">Admin: {userName}</span>
              <button className="logout-btn" onClick={onLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">👥</div>
          <div className="stat-content">
            <h3 className="stat-number">{analyticsData.totalUsers.toLocaleString()}</h3>
            <p className="stat-label">Tổng người dùng</p>
            <span className="stat-change positive">+12% so với tháng trước</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon tutors">👨‍🏫</div>
          <div className="stat-content">
            <h3 className="stat-number">{analyticsData.totalTutors.toLocaleString()}</h3>
            <p className="stat-label">Gia sư</p>
            <span className="stat-change positive">+8% so với tháng trước</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon classes">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{analyticsData.totalClasses.toLocaleString()}</h3>
            <p className="stat-label">Lớp học</p>
            <span className="stat-change positive">+15% so với tháng trước</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-content">
            <h3 className="stat-number">{formatCurrency(analyticsData.totalRevenue)}</h3>
            <p className="stat-label">Doanh thu</p>
            <span className="stat-change positive">+22% so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="dashboard-content">
        <div className="content-left">
          {/* Monthly Signups Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Đăng ký theo tháng</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color users"></span>
                  Học viên
                </span>
                <span className="legend-item">
                  <span className="legend-color tutors"></span>
                  Gia sư
                </span>
              </div>
            </div>
            <div className="chart-content">
              <div className="bar-chart">
                {analyticsData.monthlySignups.map((data, index) => (
                  <div key={index} className="bar-group">
                    <div className="bar-container">
                      <div
                        className="bar users-bar"
                        style={{ height: `${(data.users / 150) * 100}%` }}
                        title={`${data.users} học viên`}
                      ></div>
                      <div
                        className="bar tutors-bar"
                        style={{ height: `${(data.tutors / 30) * 100}%` }}
                        title={`${data.tutors} gia sư`}
                      ></div>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Subjects */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Môn học phổ biến</h3>
            </div>
            <div className="chart-content">
              <div className="subjects-list">
                {analyticsData.topSubjects.map((subject, index) => (
                  <div key={index} className="subject-item">
                    <div className="subject-info">
                      <span className="subject-name">{subject.subject}</span>
                      <span className="subject-count">{subject.count} lớp</span>
                    </div>
                    <div className="subject-bar">
                      <div className="subject-progress" style={{ width: `${(subject.count / 50) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          {/* Recent Activities */}
          <div className="activity-card">
            <div className="activity-header">
              <h3>Hoạt động gần đây</h3>
              <button className="refresh-btn">🔄</button>
            </div>
            <div className="activity-list">
              {analyticsData.recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                  <div className="activity-content">
                    <div className="activity-description">
                      <strong>{activity.user}</strong> {activity.description}
                    </div>
                    <div className="activity-time">{activity.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
