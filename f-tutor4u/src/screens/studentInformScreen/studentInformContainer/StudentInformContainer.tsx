"use client"

import { useState, useEffect } from "react"
import type React from "react"
import StudentInformComponent from "../studentInformComponent/StudentInformComponent"

// Define interfaces for student data
export interface StudentData {
  id: string
  name: string
  avatar?: string
  birthYear: string
  educationLevel: string
  subjects: string[]
  location: string
  sessionCount: string
  costPerSession: string
  commitment: string
  timeAvailability: string
  phone: string
  email: string
  description?: string
}

const StudentInformContainer: React.FC = () => {
  const [students, setStudents] = useState<StudentData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1)
  // const [studentsPerPage] = useState<number>(1) // Show one student per page
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    // Simulate API call to fetch students
    const fetchStudents = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data
        const mockStudents: StudentData[] = [
          {
            id: "1",
            name: "Nguyễn Thanh Hải",
            birthYear: "2003",
            educationLevel: "Sinh viên năm 4",
            subjects: ["CSD203"],
            location: "Khu công nghệ cao Hòa Lạc",
            sessionCount: "2 buổi",
            costPerSession: "50k",
            commitment: "Cam kết thi FE từ tin 9+",
            timeAvailability: "Theo đổi",
            phone: "0399999999",
            email: "Nguyenhai99@gmail.com",
            description: "Sinh viên năm 4 chuyên ngành Công nghệ thông tin, có kinh nghiệm dạy kèm môn CSD203.",
          },
          {
            id: "2",
            name: "Trần Minh Tuấn",
            birthYear: "2002",
            educationLevel: "Sinh viên năm 4",
            subjects: ["MAD", "SWP"],
            location: "Thạch Thất, Hà Nội",
            sessionCount: "3 buổi",
            costPerSession: "60k",
            commitment: "Cam kết điểm A",
            timeAvailability: "Thứ 2, 4, 6",
            phone: "0388888888",
            email: "minhtuan@gmail.com",
            description: "Sinh viên xuất sắc với GPA 3.8, có 2 năm kinh nghiệm dạy kèm.",
          },
          {
            id: "3",
            name: "Lê Thị Hương",
            birthYear: "2001",
            educationLevel: "Sinh viên năm 4",
            subjects: ["PRJ301", "DBI202"],
            location: "Cầu Giấy, Hà Nội",
            sessionCount: "2 buổi",
            costPerSession: "70k",
            commitment: "Cam kết pass môn",
            timeAvailability: "Cuối tuần",
            phone: "0377777777",
            email: "thihuong@gmail.com",
            description: "Chuyên gia về Database và Project, đã hoàn thành nhiều dự án thực tế.",
          },
          {
            id: "4",
            name: "Phạm Văn Đức",
            birthYear: "2003",
            educationLevel: "Sinh viên năm 3",
            subjects: ["PRN231", "SWR302"],
            location: "Đống Đa, Hà Nội",
            sessionCount: "1 buổi",
            costPerSession: "45k",
            commitment: "Cam kết hiểu bài",
            timeAvailability: "Tối các ngày trong tuần",
            phone: "0366666666",
            email: "vanduc@gmail.com",
            description: "Sinh viên năm 3 với thành tích học tập tốt, nhiệt tình trong việc chia sẻ kiến thức.",
          },
          {
            id: "5",
            name: "Nguyễn Thị Lan",
            birthYear: "2002",
            educationLevel: "Sinh viên năm 4",
            subjects: ["MAS291", "MAE101"],
            location: "Ba Đình, Hà Nội",
            sessionCount: "2 buổi",
            costPerSession: "55k",
            commitment: "Cam kết điểm B+",
            timeAvailability: "Linh hoạt",
            phone: "0355555555",
            email: "thilan@gmail.com",
            description: "Chuyên về Toán học, có khả năng giải thích dễ hiểu và logic.",
          },
        ]

        setStudents(mockStudents)
        setTotalPages(mockStudents.length)
        setError(null)
      } catch (err) {
        console.error("Error fetching students:", err)
        setError("Failed to load student information. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleContactStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    if (student) {
      // In a real app, this might open a contact modal or navigate to a contact page
      alert(`Liên hệ với ${student.name}\nSĐT: ${student.phone}\nEmail: ${student.email}`)
    }
  }

  // Get current student for display
  const currentStudent = students[currentPage - 1] || null

  return (
    <StudentInformComponent
      student={currentStudent}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onContactStudent={handleContactStudent}
    />
  )
}

export default StudentInformContainer
