"use client"

import { useState } from "react"
import type React from "react"
import FindTutorComponent from "../findTutorComponent/FindTutorComponent"

// Define interfaces for form data
export interface TutorRequestData {
  phoneNumber: string
  requestDescription: string
  location: string
  numberOfStudents: number
  startDate: string
  sessionTime: string
  subject: string
  studentGender: string
  availableDay: string
  availableTime: string
  tutorGender: string
  educationLevel: string
  fee: string
  sessionsPerWeek: string
  additionalDetails: string
}

export interface FormErrors {
  [key: string]: string
}

const FindTutorContainer: React.FC = () => {
  const [formData, setFormData] = useState<TutorRequestData>({
    phoneNumber: "",
    requestDescription: "",
    location: "",
    numberOfStudents: 1,
    startDate: "",
    sessionTime: "",
    subject: "",
    studentGender: "",
    availableDay: "",
    availableTime: "",
    tutorGender: "",
    educationLevel: "",
    fee: "",
    sessionsPerWeek: "",
    additionalDetails: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form options data
  const formOptions = {
    subjects: [
      "MAD",
      "CSD203",
      "SWP",
    ],
    genderOptions: [
      { value: "Nam", label: "Nam" },
      { value: "Nữ", label: "Nữ" },
      { value: "Cả 2", label: "Cả 2" },
    ],
    days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    timeSlots: ["Sáng (6h-12h)", "Chiều (12h-18h)", "Tối (18h-22h)"],
    educationLevels: ["Sinh viên", "Cử nhân", "Thạc sĩ", "Tiến sĩ", "Giảng viên"],
    feeRanges: ["100k-200k/tháng", "200k-500k/tháng", "500k-1tr/tháng", "1tr-2tr/tháng", "Trên 2tr/tháng"],
  }

  const benefits = [
    "Gia sư chất lượng được kiểm duyệt gắt gao",
    "Chi cần đăng yêu cầu học",
    "Chúng tôi sẽ làm cầu nối cho bạn và Gia sư",
    "Hỗ trợ nhanh chóng, thân thiện.",
  ]

  const handleInputChange = (field: keyof TutorRequestData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ"
    }

    if (!formData.requestDescription.trim()) {
      newErrors.requestDescription = "Vui lòng mô tả yêu cầu của bạn"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Vui lòng nhập địa điểm dạy"
    }

    if (!formData.subject) {
      newErrors.subject = "Vui lòng chọn môn học"
    }

    if (!formData.studentGender) {
      newErrors.studentGender = "Vui lòng chọn giới tính học viên"
    }

    if (!formData.tutorGender) {
      newErrors.tutorGender = "Vui lòng chọn giới tính gia sư"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Tutor request submitted:", formData)
      alert("Yêu cầu tìm gia sư đã được đăng thành công! Chúng tôi sẽ liên hệ với bạn sớm.")

      // Reset form
      setFormData({
        phoneNumber: "",
        requestDescription: "",
        location: "",
        numberOfStudents: 1,
        startDate: "",
        sessionTime: "",
        subject: "",
        studentGender: "",
        availableDay: "",
        availableTime: "",
        tutorGender: "",
        educationLevel: "",
        fee: "",
        sessionsPerWeek: "",
        additionalDetails: "",
      })
    } catch (error) {
      console.error("Error submitting request:", error)
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FindTutorComponent
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      formOptions={formOptions}
      benefits={benefits}
      onInputChange={(field, value) => handleInputChange(field as keyof TutorRequestData, value)}
      onSubmit={handleSubmit}
    />
  )
}

export default FindTutorContainer
