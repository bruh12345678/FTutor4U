"use client"

import { useState, useEffect } from "react"
import type React from "react"
import TutorsComponent from "../tutorsComponent/TutorsComponent"

// Define interfaces for tutor data
export interface TutorData {
  id: string
  name: string
  avatar?: string
  location: string
  educationLevel: string
  subjects: string[]
}

export interface FilterOptions {
  subject: string
  birthYear: string
  gender: string
  educationLevel: string
  area: string
}

const TutorsContainer: React.FC = () => {
  const [tutors, setTutors] = useState<TutorData[]>([])
  const [filteredTutors, setFilteredTutors] = useState<TutorData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tutorsPerPage] = useState<number>(8)
  const [totalPages, setTotalPages] = useState<number>(1)

  // Filter state
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    subject: "",
    birthYear: "",
    gender: "",
    educationLevel: "",
    area: "",
  })

  // Form options data
  const formOptions = {
    genderOptions: [
      { value: "", label: "Tất cả" },
      { value: "Nam", label: "Nam" },
      { value: "Nữ", label: "Nữ" },
    ],
    educationLevels: [
      { value: "", label: "Tất cả" },
      { value: "Sinh viên", label: "Sinh viên" },
      { value: "Cử nhân", label: "Cử nhân" },
      { value: "Thạc sĩ", label: "Thạc sĩ" },
      { value: "Tiến sĩ", label: "Tiến sĩ" },
      { value: "Giảng viên", label: "Giảng viên" },
    ],
    areas: [
      { value: "", label: "Tất cả" },
      { value: "Hà Nội", label: "Hà Nội" },
      { value: "Cổ Đông, Sơn Tây, Hà Nội", label: "Cổ Đông, Sơn Tây, Hà Nội" },
      { value: "Mục Uyên, Tân Xã, Hà Nội", label: "Mục Uyên, Tân Xã, Hà Nội" },
      { value: "Thạch Thất, Hà Nội", label: "Thạch Thất, Hà Nội" },
      { value: "Hòa Lạc, Hà Nội", label: "Hòa Lạc, Hà Nội" },
    ],
  }

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
            name: "Phạm Duy Khương",
            location: "Cổ Đông, Sơn Tây, Hà Nội",
            educationLevel: "Sinh viên",
            subjects: ["MAS", "MAD", "DAP", "SWP", "PFP"],
          },
          {
            id: "2",
            name: "Trần Mai Lâm",
            location: "Hà Nội",
            educationLevel: "Sinh viên",
            subjects: ["FIN", "MKT"],
          },
          {
            id: "3",
            name: "Dương Văn Duy",
            location: "Hà Nội",
            educationLevel: "Sinh viên",
            subjects: ["JPN", "MLN"],
          },
          {
            id: "4",
            name: "Nguyễn Đình Huy",
            location: "Mục Uyên, Tân Xã, Hà Nội",
            educationLevel: "Sinh viên",
            subjects: ["DPL", "NLP"],
          },
          {
            id: "5",
            name: "Lê Thị Hương",
            location: "Thạch Thất, Hà Nội",
            educationLevel: "Cử nhân",
            subjects: ["MAD", "PRJ", "SWR"],
          },
          {
            id: "6",
            name: "Nguyễn Văn Tuấn",
            location: "Hòa Lạc, Hà Nội",
            educationLevel: "Thạc sĩ",
            subjects: ["PRJ", "SWP", "DBI"],
          },
          {
            id: "7",
            name: "Trần Thị Minh",
            location: "Hà Nội",
            educationLevel: "Giảng viên",
            subjects: ["MAE", "PRF", "CSI"],
          },
          {
            id: "8",
            name: "Phạm Văn Hoàng",
            location: "Cổ Đông, Sơn Tây, Hà Nội",
            educationLevel: "Sinh viên",
            subjects: ["CSD", "DBI", "PRN"],
          },
          {
            id: "9",
            name: "Nguyễn Thị Lan",
            location: "Hà Nội",
            educationLevel: "Cử nhân",
            subjects: ["MAS", "MAE", "MAD"],
          },
          {
            id: "10",
            name: "Lê Văn Đức",
            location: "Thạch Thất, Hà Nội",
            educationLevel: "Sinh viên",
            subjects: ["PRJ", "SWP", "SWT"],
          },
          {
            id: "11",
            name: "Trần Văn Nam",
            location: "Hòa Lạc, Hà Nội",
            educationLevel: "Thạc sĩ",
            subjects: ["DBI", "PRN", "IOT"],
          },
          {
            id: "12",
            name: "Nguyễn Thị Hà",
            location: "Mục Uyên, Tân Xã, Hà Nội",
            educationLevel: "Giảng viên",
            subjects: ["MAD", "PRF", "CSI"],
          },
        ]

        setTutors(mockTutors)
        setFilteredTutors(mockTutors)
        setTotalPages(Math.ceil(mockTutors.length / tutorsPerPage))
        setError(null)
      } catch (err) {
        console.error("Error fetching tutors:", err)
        setError("Failed to load tutors. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTutors()
  }, [tutorsPerPage])

  // Apply filters when filter options change
  useEffect(() => {
    applyFilters()
  }, [filterOptions])

  const applyFilters = () => {
    let filtered = [...tutors]

    // Filter by subject
    if (filterOptions.subject) {
      filtered = filtered.filter((tutor) =>
        tutor.subjects.some((subject) => subject.toLowerCase().includes(filterOptions.subject.toLowerCase())),
      )
    }

    // Filter by area
    if (filterOptions.area) {
      filtered = filtered.filter((tutor) => tutor.location.includes(filterOptions.area))
    }

    // Filter by education level
    if (filterOptions.educationLevel) {
      filtered = filtered.filter((tutor) => tutor.educationLevel === filterOptions.educationLevel)
    }

    // Filter by gender (would need gender field in data)
    // This is a placeholder for the gender filter
    if (filterOptions.gender) {
      // In a real app, you would filter by gender here
    }

    // Filter by birth year (would need birth year field in data)
    // This is a placeholder for the birth year filter
    if (filterOptions.birthYear) {
      // In a real app, you would filter by birth year here
    }

    setFilteredTutors(filtered)
    setTotalPages(Math.ceil(filtered.length / tutorsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilterOptions((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Get current tutors for pagination
  const indexOfLastTutor = currentPage * tutorsPerPage
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage
  const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor)

  return (
    <TutorsComponent
      tutors={currentTutors}
      isLoading={isLoading}
      error={error}
      formOptions={formOptions}
      filterOptions={filterOptions}
      onFilterChange={handleFilterChange}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  )
}

export default TutorsContainer
