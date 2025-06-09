"use client"
import TutorsFilterSection from "../tutorsComponent/TutorsFilterSection"
import TutorCardGrid, { type TutorData } from "../tutorsComponent/TutorsCardGrid"
import "./TutorsScreen.css"

export interface FilterOptions {
  subject: string
  birthYear: string
  gender: string
  educationLevel: string
  area: string
}

interface FormOptions {
  genderOptions: Array<{ value: string; label: string }>
  educationLevels: Array<{ value: string; label: string }>
  areas: Array<{ value: string; label: string }>
}

interface TutorsScreenProps {
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

export default function TutorsScreen({
  tutors,
  isLoading,
  error,
  formOptions,
  filterOptions,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
}: TutorsScreenProps) {
  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      )
    }
    return pages
  }

  return (
    <div className="tutors-screen">
      <TutorsFilterSection formOptions={formOptions} filterOptions={filterOptions} onFilterChange={onFilterChange} />

      <main className="tutors-main">
        <div className="tutors-container">
          {isLoading ? (
            <div className="tutors-loading">
              <div className="loading-spinner"></div>
              <p className="loading-text">Đang tải danh sách gia sư...</p>
            </div>
          ) : error ? (
            <div className="tutors-error">
              <div className="error-icon">⚠️</div>
              <h3 className="error-title">Có lỗi xảy ra</h3>
              <p className="error-message">{error}</p>
              <button className="retry-btn">Thử lại</button>
            </div>
          ) : tutors.length === 0 ? (
            <div className="no-results">
              <div className="no-results-card">
                <div className="no-results-icon">🔍</div>
                <h3 className="no-results-title">Không tìm thấy gia sư</h3>
                <p className="no-results-message">Không tìm thấy gia sư phù hợp với tiêu chí tìm kiếm.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="tutors-grid">
                {tutors.map((tutor) => (
                  <TutorCardGrid key={tutor.id} tutor={tutor} />
                ))}
              </div>

              {totalPages > 1 && <div className="pagination-container">{renderPagination()}</div>}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
