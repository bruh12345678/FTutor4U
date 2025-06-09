import './HeroSection.css';

import React from "react"

interface HeroSectionProps {
  backgroundImage?: string
  onSearch?: (subject: string) => void
  onJoinAsTutor?: () => void
}

export default function HeroSection({
  backgroundImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Sdxw9tAh4SZthw11ue9eGMqfonuwgM.png",
  onSearch,
  onJoinAsTutor,
}: HeroSectionProps) {
  const [searchValue, setSearchValue] = React.useState("")

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="hero-section" style={{ backgroundImage: `url("${backgroundImage}")` }}>
      <div className="hero-overlay">
        <p className="hero-text-top">
          Đội ngũ gia sư Tài năng trẻ có hơn 100 giáo viên và sinh viên giỏi, chuyên môn từng môn nhận dạy kèm trong
          khối FPT Education
        </p>
        <h1 className="hero-title">Hãy tìm gia sư giỏi ngay!</h1>

        <div className="hero-search-wrapper">
          <input
            type="text"
            placeholder="Hãy nhập môn học!"
            className="hero-search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="hero-search-button" onClick={handleSearch}>
            Tìm Gia Sư Ngay!
          </button>
        </div>

        <button className="hero-join-button" onClick={onJoinAsTutor}>
          Tham gia và trở thành gia sư !!!
        </button>
      </div>
    </div>
  )
}
