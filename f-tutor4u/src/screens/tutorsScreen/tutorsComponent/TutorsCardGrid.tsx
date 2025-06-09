"use client"
import "./TutorsCardGrid.css"
export interface TutorData {
    id: string
    name: string
    avatar?: string // This is already set up to be optional
    location: string
    educationLevel: string
    subjects: string[]
  }
  
  interface TutorCardGridProps {
    tutor: TutorData
  }
  
  export default function TutorCardGrid({ tutor }: TutorCardGridProps) {
    return (
      <div className="tutor-card-grid">
        <div className="tutor-card-header">
          <div className="tutor-avatar">
            {tutor.avatar ? (
              <img src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <h3 className="tutor-name">{tutor.name}</h3>
        </div>
  
        <div className="tutor-card-content">
          <div className="tutor-info-item">
            <span className="info-icon">📍</span>
            <div className="info-text">
              <span className="info-value">{tutor.location}</span>
            </div>
          </div>
  
          <div className="tutor-info-item">
            <span className="info-icon">🎓</span>
            <div className="info-text">
              <span className="info-value">{tutor.educationLevel}</span>
            </div>
          </div>
  
          <div className="tutor-info-item">
            <span className="info-icon">📚</span>
            <div className="info-text">
              <span className="info-value">Môn học:</span>
              <div className="subjects-container">
                {tutor.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }