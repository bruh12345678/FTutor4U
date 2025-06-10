/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import LoginDialog from "../loginComponent/LoginDialogComponent"
import SuccessPopup from "../../../core/component/successPopUp/SuccessPopUp"

export interface LoginData {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  userType: "student" | "tutor"
}

export interface LoginErrors {
  [key: string]: string
}

interface LoginDialogContainerProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: any) => void
}

export default function LoginDialogContainer({ isOpen, onClose, onLoginSuccess }: LoginDialogContainerProps) {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false)

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [registerData, setRegisterData] = useState<RegisterData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student",
  })

  const handleLoginInputChange = (field: keyof LoginData, value: string | boolean) => {
    setLoginData((prev) => ({
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

  const handleRegisterInputChange = (field: keyof RegisterData, value: string) => {
    setRegisterData((prev) => ({
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

  const validateLogin = (): boolean => {
    const newErrors: LoginErrors = {}

    if (!loginData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    } else if (loginData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRegister = (): boolean => {
    const newErrors: LoginErrors = {}

    if (!registerData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên"
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!registerData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    } else if (registerData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (!registerData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu"
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateLogin()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock login validation
      if (loginData.email === "lamadmin@gmail.com" && loginData.password === "123456") {
        const user = {
          id: "1",
          name: "Lâm",
          email: loginData.email,
          userType: "admin",
        }
        onLoginSuccess(user)
        handleClose()
      } else if (loginData.email === "nhattmhe182558@fpt.edu.vn" && loginData.password === "123456") {
        const user = {
          id: "2",
          name: "Minh Nhật",
          email: loginData.email,
          userType: "student",
        }
        onLoginSuccess(user)
        handleClose()
      } else {
        setErrors({ general: "Email hoặc mật khẩu không đúng" })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ general: "Có lỗi xảy ra. Vui lòng thử lại sau." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!validateRegister()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock registration
      const user = {
        id: Date.now().toString(),
        name: registerData.fullName,
        email: registerData.email,
        userType: registerData.userType,
      }

      onLoginSuccess(user)
      handleClose()

      // Show success popup instead of alert
      setShowSuccessPopup(true)
    } catch (error) {
      console.error("Register error:", error)
      setErrors({ general: "Có lỗi xảy ra. Vui lòng thử lại sau." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    // Reset form data
    setLoginData({ email: "", password: "", rememberMe: false })
    setRegisterData({ fullName: "", email: "", password: "", confirmPassword: "", userType: "student" })
    setErrors({})
    setIsLoginMode(true)
    onClose()
  }

  const handleModeSwitch = () => {
    setIsLoginMode(!isLoginMode)
    setErrors({})
  }

  const handleForgotPassword = () => {
    alert("Chức năng quên mật khẩu sẽ được phát triển trong tương lai!")
  }

  return (
    <>
      <LoginDialog
        isOpen={isOpen}
        isLoginMode={isLoginMode}
        isLoading={isLoading}
        errors={errors}
        loginData={loginData}
        registerData={registerData}
        onClose={handleClose}
        onModeSwitch={handleModeSwitch}
        onLoginInputChange={handleLoginInputChange}
        onRegisterInputChange={handleRegisterInputChange}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onForgotPassword={handleForgotPassword}
      />

      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Đăng ký thành công!"
        message="Đơn đăng ký của bạn đã được tiếp nhận. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
      />
    </>
  )
}