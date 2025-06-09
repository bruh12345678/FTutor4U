"use client"

import { useState } from "react"
import type React from "react"
import TutorRegisterComponent from "../tutorRegisterComponent/TutorRegisterComponent"

// Define interfaces for form data
export interface TutorRegistrationData {
  fullName: string
  phoneNumber: string
  email: string
  gender: string
  address: string
  selfIntroduction: string
  educationLevel: string
  subjects: string[]
  availableTimeSlots: Array<{
    day: string
    time: string
  }>
}

export interface FormErrors {
  [key: string]: string
}

const TutorRegisterContainer: React.FC = () => {
  const [formData, setFormData] = useState<TutorRegistrationData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    address: "",
    selfIntroduction: "",
    educationLevel: "",
    subjects: [],
    availableTimeSlots: [{ day: "", time: "" }],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form options data
  const formOptions = {
    genderOptions: [
      { value: "Nam", label: "Nam" },
      { value: "Nữ", label: "Nữ" },
    ],
    educationLevels: [
      "Sinh viên năm 1",
      "Sinh viên năm 2",
      "Sinh viên năm 3",
      "Sinh viên năm 4",
      "Cử nhân",
      "Thạc sĩ",
      "Tiến sĩ",
      "Giảng viên",
      "Giáo sư",
    ],
    subjects: [
      "MAD",
      "CSD203",
      "SWP",
      "PRN231",
      "PRJ301",
    ],
    days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    timeSlots: [
      "6:00 - 8:00",
      "8:00 - 10:00",
      "10:00 - 12:00",
      "12:00 - 14:00",
      "14:00 - 16:00",
      "16:00 - 18:00",
      "18:00 - 20:00",
      "20:00 - 22:00",
    ],
  }

  const handleInputChange = (field: keyof TutorRegistrationData, value: string | string[]) => {
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

  const handleTimeSlotChange = (index: number, field: "day" | "time", value: string) => {
    const newTimeSlots = [...formData.availableTimeSlots]
    newTimeSlots[index] = {
      ...newTimeSlots[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      availableTimeSlots: newTimeSlots,
    }))
  }

  const addTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      availableTimeSlots: [...prev.availableTimeSlots, { day: "", time: "" }],
    }))
  }

  const removeTimeSlot = (index: number) => {
    if (formData.availableTimeSlots.length > 1) {
      const newTimeSlots = formData.availableTimeSlots.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        availableTimeSlots: newTimeSlots,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ"
    }

    if (!formData.selfIntroduction.trim()) {
      newErrors.selfIntroduction = "Vui lòng nhập giới thiệu bản thân"
    } else if (formData.selfIntroduction.length > 1500) {
      newErrors.selfIntroduction = "Giới thiệu không được vượt quá 1500 ký tự"
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = "Vui lòng chọn trình độ học vấn"
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = "Vui lòng chọn ít nhất một môn học"
    }

    // Validate time slots
    const validTimeSlots = formData.availableTimeSlots.filter((slot) => slot.day && slot.time)
    if (validTimeSlots.length === 0) {
      newErrors.availableTimeSlots = "Vui lòng chọn ít nhất một khung thời gian"
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

      console.log("Tutor registration submitted:", formData)
      alert("Đăng ký gia sư thành công! Chúng tôi sẽ xem xét hồ sơ và liên hệ với bạn sớm.")

      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        address: "",
        selfIntroduction: "",
        educationLevel: "",
        subjects: [],
        availableTimeSlots: [{ day: "", time: "" }],
      })
    } catch (error) {
      console.error("Error submitting registration:", error)
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <TutorRegisterComponent
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      formOptions={formOptions}
      onInputChange={handleInputChange}
      onTimeSlotChange={handleTimeSlotChange}
      onAddTimeSlot={addTimeSlot}
      onRemoveTimeSlot={removeTimeSlot}
      onSubmit={handleSubmit}
    />
  )
}

export default TutorRegisterContainer
