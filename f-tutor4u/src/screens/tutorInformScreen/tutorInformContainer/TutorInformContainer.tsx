"use client"

import { useState, useEffect } from "react"
import type React from "react"
import TutorInformComponent from "../tutorInformComponent/TutorInformComponent"

// Define interfaces for tutor data
export interface ReviewData {
  id: string
  reviewerName: string
  reviewerAvatar?: string
  rating: number
  comment: string
  date: string
}

export interface TutorData {
  id: string
  name: string
  avatar?: string
  address: string
  program: string
  studentId: string
  currentSemester: string
  specialization: string
  description: string
  reviews: ReviewData[]
}

const TutorInformContainer: React.FC = () => {
  const [tutors, setTutors] = useState<TutorData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1)
  // const [tutorsPerPage] = useState<number>(1) // Show one tutor per page
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    // Simulate API call to fetch tutors
    const fetchTutors = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data
        const mockTutors: TutorData[] = [
          {
            id: "1",
            name: "Nguyễn Thanh Hải",
            address: "Thôn 4, Thạch Hòa, Hà Nội",
            program: "K17 - Tri tuệ nhân tạo",
            studentId: "HE176664",
            currentSemester: "9",
            specialization: "Kỹ thuật",
            description:
              "Nhận support các môn khối ngành KI thuật từ kì 1 đến kì 5. Cam kết chất lượng, uy tín, hài lòng mới lấy tiền",
            reviews: [
              {
                id: "1",
                reviewerName: "Bùi Hoàng Nam",
                rating: 5,
                comment:
                  "Bạn này dạy siêu nhiệt tình, vui tính và không áp lực. Các bạn có thể hỏi thoải mái mà không bị mắng",
                date: "2024-01-15",
              },
              {
                id: "2",
                reviewerName: "Lê Đức Dũng",
                rating: 2,
                comment:
                  "Mình học bạn này thấy rất khó hiểu, không có nhiệt tình trong việc học. Mình cần được hoàn tiền",
                date: "2024-01-10",
              },
            ],
          },
          {
            id: "2",
            name: "Trần Minh Tuấn",
            address: "Cầu Giấy, Hà Nội",
            program: "K16 - Công nghệ thông tin",
            studentId: "HE165432",
            currentSemester: "8",
            specialization: "Phần mềm",
            description:
              "Chuyên dạy các môn lập trình từ cơ bản đến nâng cao. Có 3 năm kinh nghiệm dạy kèm với phương pháp dễ hiểu.",
            reviews: [
              {
                id: "3",
                reviewerName: "Nguyễn Thị Lan",
                rating: 5,
                comment:
                  "Anh dạy rất tận tâm và kiên nhẫn. Giải thích rất dễ hiểu, mình đã cải thiện được điểm số rất nhiều.",
                date: "2024-01-20",
              },
              {
                id: "4",
                reviewerName: "Phạm Văn Đức",
                rating: 4,
                comment: "Dạy tốt nhưng đôi khi hơi nhanh. Nhìn chung vẫn rất hài lòng với chất lượng.",
                date: "2024-01-18",
              },
            ],
          },
          {
            id: "3",
            name: "Lê Thị Hương",
            address: "Đống Đa, Hà Nội",
            program: "K15 - Kỹ thuật phần mềm",
            studentId: "HE154321",
            currentSemester: "7",
            specialization: "Database",
            description:
              "Chuyên về Database và các môn liên quan đến quản lý dữ liệu. Đã hoàn thành nhiều project thực tế.",
            reviews: [
              {
                id: "5",
                reviewerName: "Hoàng Văn Nam",
                rating: 5,
                comment: "Chị dạy rất chi tiết và có nhiều ví dụ thực tế. Rất recommend cho ai muốn học Database.",
                date: "2024-01-22",
              },
            ],
          },
          {
            id: "4",
            name: "Phạm Văn Hoàng",
            address: "Ba Đình, Hà Nội",
            program: "K17 - An toàn thông tin",
            studentId: "HE176789",
            currentSemester: "6",
            specialization: "Bảo mật",
            description:
              "Chuyên về an toàn thông tin và bảo mật. Có kinh nghiệm thực tế về penetration testing và ethical hacking.",
            reviews: [
              {
                id: "6",
                reviewerName: "Trần Thị Mai",
                rating: 4,
                comment: "Kiến thức rất sâu và thực tế. Tuy nhiên đôi khi hơi khó theo kịp với người mới bắt đầu.",
                date: "2024-01-25",
              },
              {
                id: "7",
                reviewerName: "Nguyễn Văn Tùng",
                rating: 5,
                comment: "Excellent! Đã học được rất nhiều kiến thức thực tế về security. Highly recommended!",
                date: "2024-01-23",
              },
            ],
          },
        ]

        setTutors(mockTutors)
        setTotalPages(mockTutors.length)
        setError(null)
      } catch (err) {
        console.error("Error fetching tutors:", err)
        setError("Failed to load tutor information. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTutors()
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddReview = (tutorId: string, review: Omit<ReviewData, "id" | "date">) => {
    const newReview: ReviewData = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    }

    setTutors((prevTutors) =>
      prevTutors.map((tutor) => (tutor.id === tutorId ? { ...tutor, reviews: [newReview, ...tutor.reviews] } : tutor)),
    )
  }

  // Get current tutor for display
  const currentTutor = tutors[currentPage - 1] || null

  return (
    <TutorInformComponent
      tutor={currentTutor}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onAddReview={handleAddReview}
    />
  )
}

export default TutorInformContainer
