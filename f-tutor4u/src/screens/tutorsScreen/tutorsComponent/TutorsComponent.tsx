"use client"

import type React from "react"

import "./TutorsComponent.css"
import Pagination from "../../../core/component/pagination/Pagination";
import type { TutorData, FilterOptions } from "../tutorsContainer/TutorsContainer";

interface FormOptions {
  genderOptions: Array<{ value: string; label: string }>
  educationLevels: Array<{ value: string; label: string }>
  areas: Array<{ value: string; label: string }>
}

interface TutorsComponentProps {
  tutors: TutorData[]
  isLoading: boolean
  error: string | null
  formOptions: FormOptions
  filterOptions: FilterOptions
  onFilterChange: (field: keyof FilterOptions, value: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const TutorsComponent: React.FC<TutorsComponentProps> = ({
  tutors,
  isLoading,
  error,
  formOptions,
  filterOptions,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is already handled in the container via useEffect
    // This is just to handle the form submission event
  }

  return (
    <div className="tutors-screen">
      <div className="tutors-container">
        <div className="filter-section">
          <form className="filter-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="filter-input"
              placeholder="Môn học"
              value={filterOptions.subject}
              onChange={(e) => onFilterChange("subject", e.target.value)}
            />
            <input
              type="text"
              className="filter-input"
              placeholder="Năm sinh"
              value={filterOptions.birthYear}
              onChange={(e) => onFilterChange("birthYear", e.target.value)}
            />
            <select
              className="filter-select"
              value={filterOptions.gender}
              onChange={(e) => onFilterChange("gender", e.target.value)}
            >
              {formOptions.genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterOptions.educationLevel}
              onChange={(e) => onFilterChange("educationLevel", e.target.value)}
            >
              {formOptions.educationLevels.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterOptions.area}
              onChange={(e) => onFilterChange("area", e.target.value)}
            >
              {formOptions.areas.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="submit" className="search-btn">
              Tìm
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="tutors-loading">
            <div className="loading-spinner"></div>
            <p>Đang tải danh sách gia sư...</p>
          </div>
        ) : error ? (
          <div className="tutors-error">
            <p>{error}</p>
            <button className="retry-button">Thử lại</button>
          </div>
        ) : tutors.length === 0 ? (
          <div className="no-tutors">
            <p>Không tìm thấy gia sư phù hợp với tiêu chí tìm kiếm.</p>
          </div>
        ) : (
          <>
            <div className="tutors-grid">
              {tutors.map((tutor) => (
                <div key={tutor.id} className="tutor-card">
                  <div className="tutor-avatar">
                    {tutor.avatar ? (
                      <img src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="tutor-name">{tutor.name}</h3>
                  <div className="tutor-info">
                    <div className="info-item">
                      <span className="info-icon">📍</span>
                      <span className="info-text">{tutor.location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🎓</span>
                      <span className="info-text">{tutor.educationLevel}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📚</span>
                      <span className="info-text">{tutor.subjects.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination-container">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TutorsComponent
