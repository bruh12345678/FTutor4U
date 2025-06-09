"use client"

import type React from "react"
import { useState, useEffect } from "react"
import NewClassScreen from "../newClassComponent/newClassScreen/NewClassScreen"
import { useNavigate } from "react-router-dom"

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

const NewClassScreenContainer: React.FC = () => {
  const [tutors, setTutors] = useState<TutorData[]>([])
  const [filteredTutors, setFilteredTutors] = useState<TutorData[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTutors: TutorData[] = [
      {
        id: "1234",
        subject: "DAP",
        location: "Hòa Lạc, Thạch Thất, Hà Nội",
        price: "1.200.000 vnđ",
        schedule: "19:38 24.03.2025",
        studentType: "Trình độ gia sư: Thạc sĩ",
        tutorCount: "5 buổi (60 phút/buổi)",
        address: "Thôn 4, Thạch Hòa",
        timeSlots: "Thứ 4, Thứ 5, Thứ 6: 20h đến 22h",
      },
      {
        id: "7481",
        subject: "SWP",
        location: "Hòa Lạc, Thạch Thất, Hà Nội",
        price: "1.550.000 vnđ",
        schedule: "20:27 24.03.2025",
        studentType: "Trình độ gia sư: Sinh viên",
        tutorCount: "7 buổi (120 phút/buổi)",
        address: "Thôn 4, Thạch Hòa",
        timeSlots: "Thứ 2, Thứ 4, Thứ 6: 18h đến 20h",
      },
    ]

    setTutors(mockTutors)
    setFilteredTutors(mockTutors)
  }, [])

  const headerData = {
    phoneNumber: "0987654321-123456789",
    email: "tutor@gmail.com",
    isLoggedIn,
    onLogin: () => setIsLoggedIn(!isLoggedIn),
  }

  const searchData = {
    subjects: ["DAP", "SWP"],
    areas: ["Hòa Lạc", "Thạch Thất", "Hà Nội", "Cầu Giấy", "Đống Đa"],
  }

  const handleSearch = (subject: string, area: string) => {
    let filtered = tutors

    if (subject) {
      filtered = filtered.filter((tutor) => tutor.subject.includes(subject))
    }

    if (area) {
      filtered = filtered.filter((tutor) => tutor.location.includes(area))
    }

    setFilteredTutors(filtered)
  }
  const navigate = useNavigate();

  const handleTakeClass = (tutorId: string) => {
    //     navigate(`/post-detail?id=${tutorId}`);
    navigate(`/post-detail`);
    console.log(`Taking class with tutor ID: ${tutorId}`)
    // Implement take class logic here
  }

  return (
    <NewClassScreen
      headerData={headerData}
      searchData={searchData}
      tutors={filteredTutors}
      onSearch={handleSearch}
      onTakeClass={handleTakeClass}
    />
  )
}

export default NewClassScreenContainer
