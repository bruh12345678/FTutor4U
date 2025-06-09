"use client"

import type React from "react"

import { useEffect } from "react"
import "./SuccessPopUp.css"

interface SuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  autoCloseDelay?: number
}

export default function SuccessPopup({
  isOpen,
  onClose,
  title = "Thành công!",
  message = "Đơn đăng ký của bạn đã được tiếp nhận.",
  autoCloseDelay = 3000,
}: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoCloseDelay, onClose])

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

  if (!isOpen) return null

  return (
    <div className="success-popup-overlay" onClick={handleOverlayClick}>
      <div className="success-popup">
        <div className="success-popup-content">
          <div className="success-icon">
            <div className="success-checkmark">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#10b981" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h2 className="success-title">{title}</h2>
          <p className="success-message">{message}</p>

          <div className="success-actions">
            <button className="success-btn" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>

        <button className="success-close-btn" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
    </div>
  )
}
