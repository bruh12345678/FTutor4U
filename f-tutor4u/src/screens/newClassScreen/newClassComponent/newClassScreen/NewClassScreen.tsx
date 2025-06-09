import "./NewClassScreen.css"
import SearchSection from "../searchSection/SearchSection"
import TutorCard from "../tutorCard/TutorCard"
import { useState } from "react"
import SuccessPopup from "../../../../core/component/successPopUp/SuccessPopUp"

interface TutorData {
  id: string
  subject: string
  location: string
  price: string
  schedule: string
  studentType: string
  tutorCount: string
  address: string
  timeSlots: string
}

interface NewClassScreenProps {
  headerData: {
    phoneNumber: string
    email: string
    isLoggedIn: boolean
    onLogin: () => void
  }
  searchData: {
    subjects: string[]
    areas: string[]
  }
  tutors: TutorData[]
  onSearch: (subject: string, area: string) => void
  onTakeClass: (tutorId: string) => void
}

export default function NewClassScreen({ searchData, tutors, onSearch, onTakeClass }: NewClassScreenProps) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const screenStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "system-ui, -apple-system, sans-serif",
  }

  const mainStyle: React.CSSProperties = {
    padding: "32px 0",
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  }

  const noResultsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
  }

  const noResultsCardStyle: React.CSSProperties = {
    background: "white",
    padding: "48px 32px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
    maxWidth: "400px",
  }

  const handleTakeClass = (tutorId: string) => {
    onTakeClass(tutorId)
    setShowSuccessPopup(true)
  }

  return (
    <div style={screenStyle}>
      <SearchSection {...searchData} onSearch={onSearch} />

      <main style={mainStyle}>
        <div style={containerStyle}>
          {tutors.length > 0 ? (
            <div>
              {tutors.map((tutor) => (
                <TutorCard key={tutor.id} {...tutor} onTakeClass={handleTakeClass} />
              ))}
            </div>
          ) : (
            <div style={noResultsStyle}>
              <div style={noResultsCardStyle}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1f2937", margin: "0 0 8px 0" }}>
                  Không tìm thấy gia sư phù hợp
                </h3>
                <p style={{ color: "#6b7280", fontSize: "16px", margin: "0", lineHeight: "1.5" }}>
                  Vui lòng thử lại với tiêu chí khác.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Nhận lớp thành công!"
        message="Bạn đã nhận lớp thành công. Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin."
      />
    </div>
  )
}