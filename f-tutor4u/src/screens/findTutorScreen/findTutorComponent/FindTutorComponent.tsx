"use client"

import type React from "react"
import "./FindTutorComponent.css"
import type { TutorRequestData, FormErrors } from "../findTutorContainer/FindTutorContainer"

interface FormOptions {
  subjects: string[]
  genderOptions: Array<{ value: string; label: string }>
  days: string[]
  timeSlots: string[]
  educationLevels: string[]
  feeRanges: string[]
}

interface FindTutorComponentProps {
  formData: TutorRequestData
  errors: FormErrors
  isSubmitting: boolean
  formOptions: FormOptions
  benefits: string[]
  onInputChange: (field: keyof TutorRequestData, value: string | number) => void
  onSubmit: () => void
}

const FindTutorComponent: React.FC<FindTutorComponentProps> = ({
  formData,
  errors,
  isSubmitting,
  formOptions,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="find-tutor-screen">
      <div className="find-tutor-container">
        <div className="form-section">
          <h2 className="section-title">Mô tả yêu cầu tìm gia sư</h2>

          <div className="form-group">
            <label className="form-label">Số điện thoại liên hệ:</label>
            <input
              type="tel"
              className={`form-input ${errors.phoneNumber ? "error" : ""}`}
              placeholder="Ví dụ: 0912******"
              value={formData.phoneNumber}
              onChange={(e) => onInputChange("phoneNumber", e.target.value)}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Tóm tắt yêu cầu (tối đa 20 từ)</label>
            <textarea
              className={`form-textarea ${errors.requestDescription ? "error" : ""}`}
              placeholder="Ví dụ: Tìm gia sư môn MAD tại Thôn 3 Hòa Lạc"
              value={formData.requestDescription}
              onChange={(e) => onInputChange("requestDescription", e.target.value)}
              rows={3}
            />
            {errors.requestDescription && <span className="error-message">{errors.requestDescription}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Địa điểm dạy:</label>
              <input
                type="text"
                className={`form-input ${errors.location ? "error" : ""}`}
                placeholder="Nhập vị trí"
                value={formData.location}
                onChange={(e) => onInputChange("location", e.target.value)}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Số học viên</label>
              <input
                type="number"
                className="form-input"
                min="1"
                value={formData.numberOfStudents}
                onChange={(e) => onInputChange("numberOfStudents", Number.parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ngày bắt đầu</label>
              <input
                type="date"
                className="form-input"
                value={formData.startDate}
                onChange={(e) => onInputChange("startDate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Giờ mỗi buổi</label>
              <select
                className="form-select"
                value={formData.sessionTime}
                onChange={(e) => onInputChange("sessionTime", e.target.value)}
              >
                <option value="">Chọn</option>
                <option value="1h">1 giờ</option>
                <option value="1.5h">1.5 giờ</option>
                <option value="2h">2 giờ</option>
                <option value="2.5h">2.5 giờ</option>
                <option value="3h">3 giờ</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Môn học</label>
              <select
                className={`form-select ${errors.subject ? "error" : ""}`}
                value={formData.subject}
                onChange={(e) => onInputChange("subject", e.target.value)}
              >
                <option value="">Chọn môn học</option>
                {formOptions.subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Giới tính học viên</label>
              <div className="gender-buttons">
                {formOptions.genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`gender-btn ${formData.studentGender === option.value ? "active" : ""}`}
                    onClick={() => onInputChange("studentGender", option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.studentGender && <span className="error-message">{errors.studentGender}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Thời gian có thể học</label>
            <div className="time-selection">
              <button type="button" className="add-time-btn">
                +
              </button>
              <select
                className="form-select"
                value={formData.availableDay}
                onChange={(e) => onInputChange("availableDay", e.target.value)}
              >
                <option value="">Thứ</option>
                {formOptions.days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={formData.availableTime}
                onChange={(e) => onInputChange("availableTime", e.target.value)}
              >
                <option value="">Giờ</option>
                {formOptions.timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="subsection-title">Yêu cầu gia sư</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Giới tính gia sư</label>
              <div className="gender-buttons">
                {formOptions.genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`gender-btn ${formData.tutorGender === option.value ? "active" : ""}`}
                    onClick={() => onInputChange("tutorGender", option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.tutorGender && <span className="error-message">{errors.tutorGender}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Trình độ</label>
              <select
                className="form-select"
                value={formData.educationLevel}
                onChange={(e) => onInputChange("educationLevel", e.target.value)}
              >
                <option value="">Tùy</option>
                {formOptions.educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Học phí</label>
              <select
                className="form-select"
                value={formData.fee}
                onChange={(e) => onInputChange("fee", e.target.value)}
              >
                <option value="">Tháng</option>
                {formOptions.feeRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Buổi/Tuần</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: 3"
                value={formData.sessionsPerWeek}
                onChange={(e) => onInputChange("sessionsPerWeek", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mô tả chi tiết</label>
            <textarea
              className="form-textarea large"
              placeholder="Nhập mô tả chi tiết về yêu cầu của bạn..."
              value={formData.additionalDetails}
              onChange={(e) => onInputChange("additionalDetails", e.target.value)}
              rows={6}
            />
          </div>

          <button className={`submit-btn ${isSubmitting ? "loading" : ""}`} onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Đăng yêu cầu"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FindTutorComponent
