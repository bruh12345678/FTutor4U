"use client"

import type React from "react"

import { useEffect } from "react"
import "./LoginDialogComponent.css"
import type { LoginErrors, LoginData, RegisterData } from "../../loginScreen/loginContainer/LoginDialogContainer"


interface LoginDialogProps {
  isOpen: boolean
  isLoginMode: boolean
  isLoading: boolean
  errors: LoginErrors
  loginData: LoginData
  registerData: RegisterData
  onClose: () => void
  onModeSwitch: () => void
  onLoginInputChange: (field: keyof LoginData, value: string | boolean) => void
  onRegisterInputChange: (field: keyof RegisterData, value: string) => void
  onLogin: () => void
  onRegister: () => void
  onForgotPassword: () => void
}

export default function LoginDialog({
  isOpen,
  isLoginMode,
  isLoading,
  errors,
  loginData,
  registerData,
  onClose,
  onModeSwitch,
  onLoginInputChange,
  onRegisterInputChange,
  onLogin,
  onRegister,
  onForgotPassword,
}: LoginDialogProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoginMode) {
      onLogin()
    } else {
      onRegister()
    }
  }

  if (!isOpen) return null

  return (
    <div className="login-dialog-overlay" onClick={handleOverlayClick}>
      <div className="login-dialog">
        <div className="login-dialog-header">
          <h2 className="login-dialog-title">{isLoginMode ? "Đăng nhập" : "Đăng ký"}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="login-dialog-content">
          {errors.general && <div className="error-banner">{errors.general}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            {isLoginMode ? (
              // Login Form
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Nhập email của bạn"
                    value={loginData.email}
                    onChange={(e) => onLoginInputChange("email", e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">
                    Mật khẩu
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Nhập mật khẩu"
                    value={loginData.password}
                    onChange={(e) => onLoginInputChange("password", e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-options">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="checkbox-input"
                      checked={loginData.rememberMe}
                      onChange={(e) => onLoginInputChange("rememberMe", e.target.checked)}
                      disabled={isLoading}
                    />
                    <div className="custom-checkbox"></div>
                    <label htmlFor="remember-me" className="checkbox-label">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>

                  <button type="button" className="forgot-password-btn" onClick={onForgotPassword} disabled={isLoading}>
                    Quên mật khẩu?
                  </button>
                </div>

                <button type="submit" className={`submit-btn ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </>
            ) : (
              // Register Form
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="register-fullname">
                    Họ và tên
                  </label>
                  <input
                    id="register-fullname"
                    type="text"
                    className={`form-input ${errors.fullName ? "error" : ""}`}
                    placeholder="Nhập họ và tên"
                    value={registerData.fullName}
                    onChange={(e) => onRegisterInputChange("fullName", e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-email">
                    Email
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Nhập email của bạn"
                    value={registerData.email}
                    onChange={(e) => onRegisterInputChange("email", e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-password">
                    Mật khẩu
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                    value={registerData.password}
                    onChange={(e) => onRegisterInputChange("password", e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-confirm-password">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    id="register-confirm-password"
                    type="password"
                    className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                    placeholder="Nhập lại mật khẩu"
                    value={registerData.confirmPassword}
                    onChange={(e) => onRegisterInputChange("confirmPassword", e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Loại tài khoản</label>
                  <div className="user-type-buttons">
                    <button
                      type="button"
                      className={`user-type-btn ${registerData.userType === "student" ? "active" : ""}`}
                      onClick={() => onRegisterInputChange("userType", "student")}
                      disabled={isLoading}
                    >
                      Học viên
                    </button>
                    <button
                      type="button"
                      className={`user-type-btn ${registerData.userType === "tutor" ? "active" : ""}`}
                      onClick={() => onRegisterInputChange("userType", "tutor")}
                      disabled={isLoading}
                    >
                      Gia sư
                    </button>
                  </div>
                </div>

                <button type="submit" className={`submit-btn ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </>
            )}
          </form>

          <div className="mode-switch">
            <p>
              {isLoginMode ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
              <button className="switch-btn" onClick={onModeSwitch} disabled={isLoading}>
                {isLoginMode ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
