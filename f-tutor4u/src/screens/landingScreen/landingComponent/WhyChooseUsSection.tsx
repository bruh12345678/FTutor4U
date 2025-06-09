import './WhyChooseUsSection.css';

interface WhyPoint {
  icon: string
  title: string
  description: string
}

interface WhyChooseUsSectionProps {
  backgroundImage?: string
  floatingImage?: string
  points?: WhyPoint[]
}

export default function WhyChooseUsSection({
  backgroundImage = "/placeholder.svg?height=800&width=1200",
  floatingImage = "/placeholder.svg?height=400&width=300",
  points,
}: WhyChooseUsSectionProps) {
  const defaultPoints: WhyPoint[] = [
    {
      icon: "👍",
      title: "Chất lượng",
      description: "Đội ngũ giáo viên được chọn lọc kỹ, có chuyên môn cao, vui vẻ, tâm huyết.",
    },
    {
      icon: "📅",
      title: "Chương trình học",
      description:
        "Chúng tôi luôn có những gia sư trẻ tuổi là chính sinh viên đạt thành tích cao trong chính các môn học.",
    },
    {
      icon: "❤️",
      title: "Sự hài lòng",
      description: "Sự hài lòng của phụ huynh và tiến bộ của học viên là phương châm hoạt động của chúng tôi.",
    },
    {
      icon: "💎",
      title: "Uy tín",
      description: "Chúng tôi đã được tổ chức giáo dục FPT Education kiểm chứng.",
    },
    {
      icon: "💬",
      title: "Cách dạy và học",
      description:
        "Chúng tôi luôn đổi mới, mềm dẻo trong cách dạy, làm cho học viên dễ tiếp thu, từ đó tiến bộ nhanh chóng.",
    },
    {
      icon: "⏰",
      title: "Kết nối nhanh chóng",
      description:
        "Bạn chỉ cần 2 phút để đăng tìm Gia Sư, chúng tôi sẽ liên hệ ngay khi tìm thấy gia sư phù hợp với bạn.",
    },
  ]

  const whyPoints = points || defaultPoints

  return (
    <section className="why-choose-us-section" style={{ backgroundImage: `url("${backgroundImage}")` }}>
      <div className="why-overlay">
        <div className="why-content">
          <img src={floatingImage || "/placeholder.svg"} alt="Why Choose Us" className="why-floating-image" />
          <div className="why-points-container">
            <h2 className="why-title">Tại sao bạn Chọn chúng tôi?</h2>
            {whyPoints.map((point, index) => (
              <div key={index} className="why-point">
                <div className="why-icon">{point.icon}</div>
                <div className="why-text">
                  <span className="why-point-title">{point.title}:</span>
                  <span className="why-point-description">{point.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
