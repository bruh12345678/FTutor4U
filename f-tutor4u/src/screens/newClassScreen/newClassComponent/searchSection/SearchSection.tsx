"use client"

import { useState } from "react"
import "./SearchSection.css"
interface SearchSectionProps {
  subjects: string[]
  areas: string[]
  onSearch: (subject: string, area: string) => void
}

export default function SearchSection({ subjects, areas, onSearch }: SearchSectionProps) {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedArea, setSelectedArea] = useState("")

  const handleSearch = () => {
    onSearch(selectedSubject, selectedArea)
  }

  const sectionStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
    padding: "32px 0",
    borderBottom: "1px solid #d1d5db",
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  }

  const formStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  }

  const selectStyle: React.CSSProperties = {
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "white",
    fontSize: "14px",
    fontWeight: "500",
    minWidth: "160px",
    cursor: "pointer",
    fontFamily: "system-ui, -apple-system, sans-serif",
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
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
    fontFamily: "system-ui, -apple-system, sans-serif",
  }

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        <div style={formStyle}>
          <select style={selectStyle} value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="">Môn học</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <select style={selectStyle} value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            <option value="">Khu vực</option>
            {areas.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>

          <button style={buttonStyle} onClick={handleSearch}>
            <span>🔍</span>
            Tìm
          </button>
        </div>
      </div>
    </div>
  )
}
