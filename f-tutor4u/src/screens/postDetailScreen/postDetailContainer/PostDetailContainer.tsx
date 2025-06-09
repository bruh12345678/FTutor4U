"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type React from "react"
import PostDetailComponent from "../postDetailComponent/postDetailComponent/PostDetailComponent"

// Define the post data interface
export interface PostData {
  id: string
  tutorName: string
  tutorAvatar?: string
  title: string
  postDate: string
  birthYear: string
  position: string
  subject: string
  location: string
  sessionCount: string
  costPerSession: string
  targetAudience: string
  timeAvailability: string
  description: string
}

interface PostDetailContainerProps {
  postId?: string // Optional: can be used to fetch specific post
}

const PostDetailContainer: React.FC<PostDetailContainerProps> = ({ postId = "1" }) => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState<PostData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [contactRequested, setContactRequested] = useState<boolean>(false)

  useEffect(() => {
    // Simulate API call to fetch post data
    const fetchPostData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data based on the image
        const mockData: PostData = {
          id: postId,
          tutorName: "Nguyễn Thanh Hải",
          tutorAvatar: undefined, // No actual image in the example
          title: "Mở lớp ôn luyện CSD203 target 9+ giá hạt dẻ",
          postDate: "20/3/2025",
          birthYear: "1999",
          position: "Giảng viên",
          subject: "CSD203",
          location: "Khu công nghệ cao Hòa Lạc",
          sessionCount: "2 buổi",
          costPerSession: "50k",
          targetAudience: "Cam kết FE từ 9+",
          timeAvailability: "Theo đổi",
          description: `Xin chào, tôi tên là Nguyễn Thanh Hải, hiện đang là giả sư với 3 năm kinh nghiệm giảng dạy. Tôi rất đam mê công việc giảng dạy và luôn cố gắng mang đến cho học sinh một môi trường học tập hiệu quả, thú vị và dễ hiểu.

Ưu điểm của tôi:
Kinh nghiệm giảng dạy: Tôi đã từng giảng dạy cho nhiều học sinh ở các lứa tuổi và trình độ khác nhau.
Phương pháp giảng dạy linh hoạt: Tôi luôn cố gắng làm cho việc học trở nên thú vị và dễ hiểu hơn, bài giảng của tôi thường bao gồm các ví dụ cụ thể, bài tập thực hành, và các phương pháp dạy học sáng tạo.
Tận tâm và kiên nhẫn: Tôi luôn sẵn sàng lắng nghe và hỗ trợ học sinh, không ngừng khuyến khích các em phát triển khả năng tư duy. Tôi rất kiên nhẫn và luôn tìm cách giải thích những kiến thức khó hiểu một cách đơn giản và dễ hiểu.
Kỹ năng giao tiếp tốt: Tôi có khả năng giao tiếp tốt với sinh viên và phụ huynh, luôn theo dõi sự tiến bộ của sinh viên và báo cáo cho phụ huynh.
Thái độ chuyên nghiệp và trách nhiệm cao: Tôi luôn cam kết đảm bảo chất lượng giảng dạy và tuân thủ các nguyên tắc đạo đức nghề nghiệp, tôn trọng thời gian và mục tiêu của sinh viên, phụ huynh.`,
        }

        setPostData(mockData)
        setError(null)
      } catch (err) {
        console.error("Error fetching post data:", err)
        setError("Failed to load post data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPostData()
  }, [postId])

  const handleContactRequest = () => {
    // In a real app, this would send a request to the backend
    console.log("Contact requested for post:", postId)
    setContactRequested(true)
  }
  const handleContactClick = () => {
    // First call the contact request handler
    handleContactRequest()

    // Then navigate to the contact information page
    if (postData) {
      // navigate(`/post/${postData.id}/contact`)
      navigate(`/contact-inform`)
    }
  }

  return (
    <PostDetailComponent
      postData={postData}
      isLoading={isLoading}
      error={error}
      contactRequested={contactRequested}
      onContactRequest={handleContactRequest}
      onContactClick={handleContactClick}
    />
  )
}

export default PostDetailContainer
