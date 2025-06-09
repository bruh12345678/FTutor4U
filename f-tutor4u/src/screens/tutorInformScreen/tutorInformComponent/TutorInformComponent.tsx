"use client"

import type React from "react"
import { useState } from "react"

import "./TutorInformComponent.css"
import Pagination from "../../../core/component/pagination/Pagination"
import type { TutorData, ReviewData } from "../tutorInformContainer/TutorInformContainer"

interface TutorInformComponentProps {
  tutor: TutorData | null
  isLoading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onAddReview: (tutorId: string, review: Omit<ReviewData, "id" | "date">) => void
}

const TutorInformComponent: React.FC<TutorInformComponentProps> = ({
  tutor,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onAddReview,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    rating: 5,
    comment: "",
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (tutor && newReview.reviewerName.trim() && newReview.comment.trim()) {
      onAddReview(tutor.id, newReview)
      setNewReview({ reviewerName: "", rating: 5, comment: "" })
      setShowReviewForm(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ))
  }

  if (isLoading) {
    return (
      <div className="tutor-inform-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin gia sư...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="tutor-inform-error">
        <p>{error}</p>
        <button className="retry-button">Thử lại</button>
      </div>
    )
  }

  if (!tutor) {
    return (
      <div className="tutor-inform-error">
        <p>Không tìm thấy thông tin gia sư.</p>
      </div>
    )
  }

  return (
    <div className="tutor-inform-screen">
      <div className="tutor-inform-container">
        <div className="tutor-profile">
          <div className="profile-header">
            <h1 className="tutor-name">{tutor.name}</h1>
          </div>

          <div className="profile-content">
            <div className="cv-section">
              <div className="cv-placeholder">
                {tutor.avatar ? (
                  <img src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                ) : (
                  <div className="cv-text">CV</div>
                )}
              </div>
            </div>

            <div className="tutor-details">
              <ul className="details-list">
                <li className="detail-item">
                  <span className="detail-value">{tutor.address}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-value">{tutor.program}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">Mã số sinh viên:</span>
                  <span className="detail-value">{tutor.studentId}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-label">KI hiện tại:</span>
                  <span className="detail-value">{tutor.currentSemester}</span>
                </li>
                <li className="detail-item">
                  <span className="detail-value">{tutor.description}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="reviews-section">
            <div className="reviews-header">
              <h3>Đánh giá từ học viên</h3>
              <button className="add-review-btn" onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? "Hủy" : "Thêm đánh giá"}
              </button>
            </div>

            {showReviewForm && (
              <form className="review-form" onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Tên của bạn"
                    value={newReview.reviewerName}
                    onChange={(e) => setNewReview({ ...newReview, reviewerName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Đánh giá:</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= newReview.rating ? "active" : ""}`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Nhận xét của bạn..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <button type="submit" className="submit-review-btn">
                  Gửi đánh giá
                </button>
              </form>
            )}

            <div className="reviews-list">
              {tutor.reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.reviewerAvatar ? (
                          <img src={review.reviewerAvatar || "/placeholder.svg"} alt={review.reviewerName} />
                        ) : (
                          <div className="avatar-placeholder">
                            <span>{review.reviewerName.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="reviewer-details">
                        <h4 className="reviewer-name">{review.reviewerName}</h4>
                        <div className="review-rating">{renderStars(review.rating)}</div>
                      </div>
                    </div>
                    <span className="review-date">{new Date(review.date).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
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

export default TutorInformComponent
