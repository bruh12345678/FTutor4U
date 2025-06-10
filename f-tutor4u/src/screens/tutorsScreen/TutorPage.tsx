"use client"

import { useState, useEffect } from "react"
import TutorsScreen, { type FilterOptions } from "./TutorsScreen/TutorsScreen"
import type { TutorData } from "./tutorsComponent/TutorsCardGrid"

import doNgocMinhAvatar from "../../assets/do_ngoc_minh_avatar.jpg";
import doanThiMoAvatar from "../../assets/doan_thi_mo_avatar.jpg";
import kieuBaoTramAvatar from "../../assets/kieu_bao_tram_avatar.jpg";
import leThiThuThanhAvatar from "../../assets/le_thi_thu_thanh_avatar.jpg";
import nguyenDucVuAvatar from "../../assets/nguyen_duc_vu_avatar.jpg";
import nguyenHuuDuyAvatar from "../../assets/nguyen_huu_duy_avatar.jpg";
import nguyenThuThuyAvatar from "../../assets/nguyen_thu_thuy_avatar.jpg";
import vuongTieuMiAvatar from "../../assets/vuong_tieu_mi_avatar.jpg";

export default function TutorsPage() {
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
      const fetchTutors = async () => {
        setIsLoading(true)
        try {
          await new Promise((resolve) => setTimeout(resolve, 800))
  
          // Mock data with avatar images
          const mockTutors: TutorData[] = [
            {
              id: "1",
              name: "Đỗ Ngọc Minh",
              avatar: doNgocMinhAvatar,
              location: "Cổ Đông, Sơn Tây, Hà Nội",
              educationLevel: "Sinh viên",
              subjects: ["MAS", "MAD", "DAP", "SWP", "PFP"],
            },
            {
              id: "2",
              name: "Đoàn Thị Mơ",
              avatar: doanThiMoAvatar,
              location: "Hà Nội",
              educationLevel: "Sinh viên",
              subjects: ["FIN", "MKT"],
            },
            {
              id: "3",
              name: "Kiều Bảo Trâm",
              avatar: kieuBaoTramAvatar,
              location: "Hà Nội",
              educationLevel: "Sinh viên",
              subjects: ["JPN", "MLN"],
            },
            {
              id: "4",
              name: "Lê Thị Thu Thanh",
              avatar: leThiThuThanhAvatar,
              location: "Mục Uyên, Tân Xã, Hà Nội",
              educationLevel: "Sinh viên",
              subjects: ["DPL", "NLP"],
            },
            {
              id: "5",
              name: "Nguyễn Đức Vũ",
              avatar: nguyenDucVuAvatar,
              location: "Thạch Thất, Hà Nội",
              educationLevel: "Cử nhân",
              subjects: ["MAD", "PRJ", "SWR"],
            },
            {
              id: "6",
              name: "Nguyễn Hữu Duy",
              avatar: nguyenHuuDuyAvatar,
              location: "Hòa Lạc, Hà Nội",
              educationLevel: "Thạc sĩ",
              subjects: ["PRJ", "SWP", "DBI"],
            },
            {
              id: "7",
              name: "Nguyễn Thu Thuỷ",
              avatar: nguyenThuThuyAvatar,
              location: "Hà Nội",
              educationLevel: "Giảng viên",
              subjects: ["MAE", "PRF", "CSI"],
            },
            {
              id: "8",
              name: "Vương Tiểu Mi",
              avatar: vuongTieuMiAvatar,
              location: "Cổ Đông, Sơn Tây, Hà Nội",
              educationLevel: "Sinh viên",
              subjects: ["CSD", "DBI", "PRN"],
            },
          ];
  
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
  
    useEffect(() => {
      applyFilters()
    }, [filterOptions])
  
    const applyFilters = () => {
      let filtered = [...tutors]
  
      if (filterOptions.subject) {
        filtered = filtered.filter((tutor) =>
          tutor.subjects.some((subject) => subject.toLowerCase().includes(filterOptions.subject.toLowerCase())),
        )
      }
  
      if (filterOptions.area) {
        filtered = filtered.filter((tutor) => tutor.location.includes(filterOptions.area))
      }
  
      if (filterOptions.educationLevel) {
        filtered = filtered.filter((tutor) => tutor.educationLevel === filterOptions.educationLevel)
      }
  
      setFilteredTutors(filtered)
      setTotalPages(Math.ceil(filtered.length / tutorsPerPage))
      setCurrentPage(1)
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
  
    const indexOfLastTutor = currentPage * tutorsPerPage
    const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage
    const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor)
  
    return (
      <TutorsScreen
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
  