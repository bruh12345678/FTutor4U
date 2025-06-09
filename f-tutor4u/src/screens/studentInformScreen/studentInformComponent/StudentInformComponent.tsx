"use client"

import type React from "react"

import "./StudentInformComponent.css"
import Pagination from "../../../core/component/pagination/Pagination"
import type { StudentData } from "../studentInformContainer/StudentInformContainer"

interface StudentInformComponentProps {
  student: StudentData | null
  isLoading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onContactStudent: (studentId: string) => void
}

const StudentInformComponent: React.FC<StudentInformComponentProps> = ({
  student,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onContactStudent,
}) => {
  if (isLoading) {
    return (
      <div className="student-inform-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin sinh viên...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="student-inform-error">
        <p>{error}</p>
        <button className="retry-button">Thử lại</button>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="student-inform-error">
        <p>Không tìm thấy thông tin sinh viên.</p>
      </div>
    )
  }

  return (
    <div className="student-inform-screen">
      <div className="student-inform-container">
        <div className="student-profile">
          <div className="profile-header">
            <h1 className="student-name">{student.name}</h1>
          </div>

          <div className="profile-content">
            <div className="cv-section">
              <div className="cv-placeholder">
                {student.avatar ? (
                  <img src={student.avatar || "/placeholder.svg"} alt={student.name} />
                ) : (
                  <div className="cv-text">CV</div>
                )}
              </div>
            </div>

            <div className="student-details">
              <ul className="details-list">
                <li className="detail-item">
                  <span className="detail-label">Năm sinh:</span>
                  <span className="detail-value">{student.birthYear}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Trình độ:</span>
                  <span className="detail-value">{student.educationLevel}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Môn dạy:</span>
                  <span className="detail-value">{student.subjects.join(", ")}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Có thể dạy tại:</span>
                  <span className="detail-value">{student.location}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Thời lượng dạy:</span>
                  <span className="detail-value">{student.sessionCount}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Chi phí (1 buổi):</span>
                  <span className="detail-value">{student.costPerSession}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Cam kết:</span>
                  <span className="detail-value">{student.commitment}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Thời gian:</span>
                  <span className="detail-value">{student.timeAvailability}</span>
                </li>
              </ul>

              {student.description && (
                <div className="student-description">
                  <h3>Mô tả:</h3>
                  <p>{student.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="contact-section">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-text">{student.phone}</span>
              </div>
              <div className="contact-divider">—</div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span className="contact-text">{student.email}</span>
              </div>
            </div>

            <button className="contact-button" onClick={() => onContactStudent(student.id)}>
              Liên hệ ngay
            </button>
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentInformComponent
