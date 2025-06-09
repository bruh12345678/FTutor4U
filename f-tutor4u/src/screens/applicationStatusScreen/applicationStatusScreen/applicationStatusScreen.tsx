"use client"

import { useState, useEffect } from "react"
import "./applicationStatusScreen.css"

export interface ApplicationData {
  id: string
  createdAt: string
  className: string
  subject: string
  status: "pending" | "waiting_transaction" | "in_progress" | "completed" | "cancelled"
  tutorName?: string
  amount?: string
  lastUpdated: string
}

interface ApplicationStatusScreenProps {
  applications?: ApplicationData[]
  isLoading?: boolean
}

const statusLabels = {
  pending: "Chờ xử lý",
  waiting_transaction: "Chờ thanh toán",
  in_progress: "Đang học",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
}

const statusColors = {
  pending: "#f59e0b",
  waiting_transaction: "#3b82f6",
  in_progress: "#10b981",
  completed: "#059669",
  cancelled: "#ef4444",
}

export default function ApplicationStatusScreen({ applications, isLoading = false }: ApplicationStatusScreenProps) {
  const [mockApplications, setMockApplications] = useState<ApplicationData[]>([])

  useEffect(() => {
    if (!applications) {
      // Mock data for demonstration
      const mockData: ApplicationData[] = [
        {
          id: "APP001",
          createdAt: "2024-03-15 14:30:00",
          className: "Lớp DAP cơ bản",
          subject: "DAP",
          status: "completed",
          tutorName: "Nguyễn Văn A",
          amount: "1.200.000 vnđ",
          lastUpdated: "2024-03-20 10:15:00",
        },
        {
          id: "APP002",
          createdAt: "2024-03-18 09:45:00",
          className: "Lớp SWP nâng cao",
          subject: "SWP",
          status: "in_progress",
          tutorName: "Trần Thị B",
          amount: "1.550.000 vnđ",
          lastUpdated: "2024-03-22 16:20:00",
        },
        {
          id: "APP003",
          createdAt: "2024-03-22 11:20:00",
          className: "Lớp Math cơ bản",
          subject: "Math",
          status: "waiting_transaction",
          tutorName: "Lê Văn C",
          amount: "1.000.000 vnđ",
          lastUpdated: "2024-03-22 11:25:00",
        },
        {
          id: "APP004",
          createdAt: "2024-03-23 15:10:00",
          className: "Lớp English giao tiếp",
          subject: "English",
          status: "pending",
          amount: "1.300.000 vnđ",
          lastUpdated: "2024-03-23 15:10:00",
        },
      ]
      setMockApplications(mockData)
    }
  }, [applications])

  const displayApplications = applications || mockApplications

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳"
      case "waiting_transaction":
        return "💳"
      case "in_progress":
        return "📚"
      case "completed":
        return "✅"
      case "cancelled":
        return "❌"
      default:
        return "📋"
    }
  }

  if (isLoading) {
    return (
      <div className="application-status-screen">
        <div className="status-container">
          <div className="status-loading">
            <div className="loading-spinner"></div>
            <p>Đang tải trạng thái đơn đăng ký...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="application-status-screen">
      <div className="status-container">
        <div className="status-header">
          <h1 className="status-title">Trạng thái đơn đăng ký</h1>
          <p className="status-subtitle">Theo dõi tiến trình các đơn đăng ký học của bạn</p>
        </div>

        {displayApplications.length === 0 ? (
          <div className="no-applications">
            <div className="no-applications-card">
              <div className="no-applications-icon">📋</div>
              <h3>Chưa có đơn đăng ký nào</h3>
              <p>Bạn chưa có đơn đăng ký học nào. Hãy tìm kiếm và đăng ký lớp học phù hợp!</p>
              <button className="browse-classes-btn">Tìm lớp học</button>
            </div>
          </div>
        ) : (
          <div className="applications-list">
            {displayApplications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="application-header">
                  <div className="application-info">
                    <h3 className="application-title">{app.className}</h3>
                    <div className="application-meta">
                      <span className="application-id">Mã đơn: {app.id}</span>
                      <span className="application-subject">{app.subject}</span>
                    </div>
                  </div>
                  <div className="status-badge" style={{ backgroundColor: statusColors[app.status] }}>
                    <span className="status-icon">{getStatusIcon(app.status)}</span>
                    <span className="status-text">{statusLabels[app.status]}</span>
                  </div>
                </div>

                <div className="application-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <div className="detail-content">
                        <span className="detail-label">Ngày tạo:</span>
                        <span className="detail-value">{app.createdAt}</span>
                      </div>
                    </div>

                    {app.tutorName && (
                      <div className="detail-item">
                        <span className="detail-icon">👨‍🏫</span>
                        <div className="detail-content">
                          <span className="detail-label">Gia sư:</span>
                          <span className="detail-value">{app.tutorName}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="detail-row">
                    {app.amount && (
                      <div className="detail-item">
                        <span className="detail-icon">💰</span>
                        <div className="detail-content">
                          <span className="detail-label">Học phí:</span>
                          <span className="detail-value amount">{app.amount}</span>
                        </div>
                      </div>
                    )}

                    <div className="detail-item">
                      <span className="detail-icon">🔄</span>
                      <div className="detail-content">
                        <span className="detail-label">Cập nhật:</span>
                        <span className="detail-value">{app.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="application-actions">
                  {app.status === "waiting_transaction" && (
                    <button className="action-btn primary">Thanh toán ngay</button>
                  )}
                  {app.status === "pending" && <button className="action-btn secondary">Hủy đơn</button>}
                  <button className="action-btn outline">Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
