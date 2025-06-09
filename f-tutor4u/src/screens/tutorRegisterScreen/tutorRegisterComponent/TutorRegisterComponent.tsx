"use client"

import type React from "react"
import "./TutorRegisterComponent.css"
import type { TutorRegistrationData, FormErrors } from "../tutorRegisterContainer/FindTutorContainer";

interface FormOptions {
  genderOptions: Array<{ value: string; label: string }>
  educationLevels: string[]
  subjects: string[]
  days: string[]
  timeSlots: string[]
}

interface TutorRegisterComponentProps {
  formData: TutorRegistrationData
  errors: FormErrors
  isSubmitting: boolean
  formOptions: FormOptions
  onInputChange: (field: keyof TutorRegistrationData, value: string | string[]) => void
  onTimeSlotChange: (index: number, field: "day" | "time", value: string) => void
  onAddTimeSlot: () => void
  onRemoveTimeSlot: (index: number) => void
  onSubmit: () => void
}

const TutorRegisterComponent: React.FC<TutorRegisterComponentProps> = ({
  formData,
  errors,
  isSubmitting,
  formOptions,
  onInputChange,
  onTimeSlotChange,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onSubmit,
}) => {
  const handleSubjectChange = (subject: string) => {
    const newSubjects = formData.subjects.includes(subject)
      ? formData.subjects.filter((s) => s !== subject)
      : [...formData.subjects, subject]
    onInputChange("subjects", newSubjects)
  }

  return (
    <div className="tutor-register-screen">
      <div className="tutor-register-container">
        <div className="form-section">
          <h2 className="section-title">Thông tin cá nhân</h2>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                className={`form-input ${errors.fullName ? "error" : ""}`}
                value={formData.fullName}
                onChange={(e) => onInputChange("fullName", e.target.value)}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <input
                type="tel"
                className={`form-input ${errors.phoneNumber ? "error" : ""}`}
                placeholder="Ví dụ: 0912*******"
                value={formData.phoneNumber}
                onChange={(e) => onInputChange("phoneNumber", e.target.value)}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-input ${errors.email ? "error" : ""}`}
                value={formData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Giới tính</label>
              <div className="gender-buttons">
                {formOptions.genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`gender-btn ${formData.gender === option.value ? "active" : ""}`}
                    onClick={() => onInputChange("gender", option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              className={`form-input ${errors.address ? "error" : ""}`}
              value={formData.address}
              onChange={(e) => onInputChange("address", e.target.value)}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Giới thiệu bản thân (1500 ký tự)
              <span className="character-count">{formData.selfIntroduction.length}/1500</span>
            </label>
            <textarea
              className={`form-textarea large ${errors.selfIntroduction ? "error" : ""}`}
              value={formData.selfIntroduction}
              onChange={(e) => onInputChange("selfIntroduction", e.target.value)}
              rows={6}
              maxLength={1500}
            />
            {errors.selfIntroduction && <span className="error-message">{errors.selfIntroduction}</span>}
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Thông tin nghề nghiệp</h2>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Trình độ</label>
              <select
                className={`form-select ${errors.educationLevel ? "error" : ""}`}
                value={formData.educationLevel}
                onChange={(e) => onInputChange("educationLevel", e.target.value)}
              >
                <option value="">Chọn trình độ</option>
                {formOptions.educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.educationLevel && <span className="error-message">{errors.educationLevel}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Môn học</label>
              <div className="subjects-container">
                <div className="subjects-grid">
                  {formOptions.subjects.map((subject) => (
                    <label key={subject} className="subject-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                      />
                      <span className="checkmark"></span>
                      {subject}
                    </label>
                  ))}
                </div>
              </div>
              {errors.subjects && <span className="error-message">{errors.subjects}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Thời gian có thể học</label>
            <div className="time-slots-container">
              {formData.availableTimeSlots.map((slot, index) => (
                <div key={index} className="time-slot-row">
                  <button type="button" className="add-time-btn" onClick={onAddTimeSlot}>
                    +
                  </button>
                  <select
                    className="form-select"
                    value={slot.day}
                    onChange={(e) => onTimeSlotChange(index, "day", e.target.value)}
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
                    value={slot.time}
                    onChange={(e) => onTimeSlotChange(index, "time", e.target.value)}
                  >
                    <option value="">Giờ</option>
                    {formOptions.timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {formData.availableTimeSlots.length > 1 && (
                    <button type="button" className="remove-time-btn" onClick={() => onRemoveTimeSlot(index)}>
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.availableTimeSlots && <span className="error-message">{errors.availableTimeSlots}</span>}
          </div>

          <button className={`submit-btn ${isSubmitting ? "loading" : ""}`} onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Đăng ký làm gia sư"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TutorRegisterComponent
