"use client"

import "./TutorCard.css"
import type React from "react"
import { useState } from "react"
import SuccessPopup from "../../../../core/component/successPopUp/SuccessPopUp"
interface TutorCardProps {
  id: string
  subject: string
  location: string
  price: string
  schedule: string
  studentType: string
  tutorCount: string
  address: string
  timeSlots: string
  onTakeClass: (id: string) => void
}

export default function TutorCard({
  id,
  subject,
  location,
  price,
  schedule,
  studentType,
  tutorCount,
  address,
  timeSlots,
}: TutorCardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginBottom: "24px",
    overflow: "hidden",
    borderLeft: "4px solid #10b981",
    transition: "all 0.3s ease",
    width: "100%",
    maxWidth: "100%",
    fontFamily: "system-ui, -apple-system, sans-serif",
  }

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
    padding: "20px 24px 16px",
    borderBottom: "1px solid #e5e7eb",
  }

  const headerContentStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap" as const,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0 0 12px 0",
    lineHeight: "1.4",
    flex: "1",
    minWidth: "0",
    wordWrap: "break-word",
    whiteSpace: "normal",
  }

  const badgeStyle: React.CSSProperties = {
    background: "#f3f4f6",
    color: "#6b7280",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    whiteSpace: "nowrap",
    flexShrink: 0,
  }

  const contentStyle: React.CSSProperties = {
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    flexWrap: "wrap" as const,
  }

  const infoGridStyle: React.CSSProperties = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: "0",
    width: "100%",
  }

  const infoItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px",
    borderRadius: "8px",
    background: "#f9fafb",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "8px",
  }

  const priceItemStyle: React.CSSProperties = {
    ...infoItemStyle,
    background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
    border: "1px solid #d1fae5",
  }

  const iconStyle: React.CSSProperties = {
    fontSize: "16px",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "2px",
  }

  const textStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: "0",
    flex: "1",
    wordWrap: "break-word",
  }

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "500",
    color: "#6b7280",
    whiteSpace: "normal",
    wordWrap: "break-word",
  }

  const valueStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.4",
    wordWrap: "break-word",
    whiteSpace: "normal",
  }

  const priceStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#10b981",
    whiteSpace: "nowrap",
  }

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexShrink: 0,
  }

  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
    whiteSpace: "nowrap",
  }

  const subjectBadgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#ede9fe",
    color: "#7c3aed",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    border: "1px solid #ddd6fe",
    whiteSpace: "nowrap",
    marginTop: "8px",
  }
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <h3 style={titleStyle}>
            Gia sư môn {subject} tại {location}
          </h3>
          <div style={badgeStyle}>Mã lớp: {id}</div>
        </div>
      </div>

      <div style={contentStyle}>
        <div style={infoGridStyle}>
          <div style={infoItemStyle}>
            <span style={iconStyle}>📅</span>
            <div style={textStyle}>
              <span style={labelStyle}>Tạo lúc:</span>
              <span style={valueStyle}>{schedule}</span>
            </div>
          </div>

          <div style={infoItemStyle}>
            <span style={iconStyle}>👤</span>
            <div style={textStyle}>
              <span style={valueStyle}>{studentType}</span>
            </div>
          </div>

          <div style={infoItemStyle}>
            <span style={iconStyle}>📚</span>
            <div style={textStyle}>
              <span style={valueStyle}>{tutorCount}</span>
            </div>
          </div>

          <div style={priceItemStyle}>
            <span style={iconStyle}>💰</span>
            <div style={textStyle}>
              <span style={labelStyle}>Học phí:</span>
              <span style={priceStyle}>{price}</span>
            </div>
          </div>

          <div style={infoItemStyle}>
            <span style={iconStyle}>📍</span>
            <div style={textStyle}>
              <span style={labelStyle}>Địa điểm dạy:</span>
              <span style={valueStyle}>{address}</span>
            </div>
          </div>

          <div style={infoItemStyle}>
            <span style={iconStyle}>⏰</span>
            <div style={textStyle}>
              <span style={labelStyle}>Thời gian rảnh:</span>
              <span style={valueStyle}>{timeSlots}</span>
            </div>
          </div>

          <div style={subjectBadgeStyle}>
            <span style={iconStyle}>📖</span>
            Môn học: {subject}
          </div>
        </div>

        <div style={actionsStyle}>
          <button style={buttonStyle} onClick={() => setShowSuccessPopup(true)}>
            Nhận lớp ngay
          </button>
        </div>
      </div>
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Nhận lớp thành công!"
        message="Bạn đã nhận lớp thành công. Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin."
      />
    </div>
  )
}