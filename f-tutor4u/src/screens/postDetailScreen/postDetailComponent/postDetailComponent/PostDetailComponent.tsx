"use client"

import type React from "react"
import type { PostData } from "../../postDetailContainer/PostDetailContainer"
import "./PostDetailComponent.css"

interface PostDetailComponentProps {
  postData: PostData | null
  isLoading: boolean
  error: string | null
  contactRequested?: boolean // Made optional
  onContactRequest?: () => void // Made optional
  onContactClick: () => void
}

const PostDetailComponent: React.FC<PostDetailComponentProps> = ({
  postData,
  isLoading,
  error,
  onContactClick,
}) => {
  if (isLoading) {
    return (
      <div className="post-detail-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="post-detail-error">
        <p>{error}</p>
        <button className="retry-button">Thử lại</button>
      </div>
    )
  }

  if (!postData) {
    return (
      <div className="post-detail-error">
        <p>Không tìm thấy thông tin bài đăng.</p>
      </div>
    )
  }

  return (
    <div className="post-detail">
      <div className="post-detail-container">
        <div className="post-header">
          <div className="tutor-info">
            <div className="tutor-avatar">
              {postData.tutorAvatar ? (
                <img src={postData.tutorAvatar || "/placeholder.svg"} alt={postData.tutorName} />
              ) : (
                <div className="avatar-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
            <h2 className="tutor-name">{postData.tutorName}</h2>
          </div>

          <div className="post-title-container">
            <h1 className="post-title">{postData.title}</h1>
            <p className="post-date">( đã đăng ngày {postData.postDate} )</p>
          </div>
        </div>

        <div className="post-content">
          <div className="post-details">
            <ul className="details-list">
              <li>
                <span className="detail-label">Năm sinh:</span> {postData.birthYear}
              </li>
              <li>
                <span className="detail-label">Trình độ:</span> {postData.position}
              </li>
              <li>
                <span className="detail-label">Môn dạy:</span> {postData.subject}
              </li>
              <li>
                <span className="detail-label">Có thể dạy tại:</span> {postData.location}
              </li>
              <li>
                <span className="detail-label">Thời lượng dạy:</span> {postData.sessionCount}
              </li>
              <li>
                <span className="detail-label">Chi phí (1 buổi):</span> {postData.costPerSession}
              </li>
              <li>
                <span className="detail-label">Cam kết:</span> {postData.targetAudience}
              </li>
              <li>
                <span className="detail-label">Thời gian:</span> {postData.timeAvailability}
              </li>
            </ul>
          </div>

          <div className="post-description">            {postData.description.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index} className="description-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="post-actions">
            <button className="contact-button" onClick={onContactClick}>
              NHẬN THÔNG TIN LIÊN HỆ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetailComponent
