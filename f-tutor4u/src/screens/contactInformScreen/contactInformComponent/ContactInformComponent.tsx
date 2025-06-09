"use client"

import type React from "react"
import "./ContactInformComponent.css"

interface TutorContactData {
  id: string
  name: string
  accountName: string
  fee: string
  qrCodeUrl: string
  contactInfo?: {
    phone: string
    email: string
    zalo?: string
  }
}

interface ContactInformComponentProps {
  tutorData: TutorContactData | null
  isLoading: boolean
  error: string | null
  paymentStatus: "pending" | "processing" | "completed" | "failed"
  showContactInfo: boolean
  onCheckPayment: () => void
  onRetryPayment: () => void
}

const ContactInformComponent: React.FC<ContactInformComponentProps> = ({
  tutorData,
  isLoading,
  error,
  paymentStatus,
  showContactInfo,
  onCheckPayment,
  onRetryPayment,
}) => {
  if (isLoading) {
    return (
      <div className="contact-inform-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="contact-inform-error">
        <p>{error}</p>
        <button className="retry-button">Thử lại</button>
      </div>
    )
  }

  if (!tutorData) {
    return (
      <div className="contact-inform-error">
        <p>Không tìm thấy thông tin gia sư.</p>
      </div>
    )
  }

  return (
    <div className="contact-inform">
      <div className="contact-inform-container">
        {!showContactInfo ? (
          <div className="payment-section">
            <h2 className="section-title">Quét QR để nhận thông tin liên lạc</h2>

            <div className="qr-code-container">
              <img src={tutorData.qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="qr-code" />
            </div>

            <div className="payment-info">
              <p className="account-info">Chủ tài khoản: {tutorData.accountName}</p>
              <p className="fee-info">Lệ phí: {tutorData.fee}</p>
            </div>

            <p className="payment-note">Sau khi thanh toán thành công, bạn có thể xem thông tin liên lạc</p>

            {paymentStatus === "pending" && (
              <button className="check-payment-btn" onClick={onCheckPayment}>
                NHẬN THÔNG TIN LIÊN HỆ
              </button>
            )}

            {paymentStatus === "processing" && (
              <div className="payment-processing">
                <div className="loading-spinner"></div>
                <p>Đang kiểm tra thanh toán...</p>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="payment-failed">
                <p>Không tìm thấy thông tin thanh toán. Vui lòng thử lại sau khi thanh toán.</p>
                <button className="retry-button" onClick={onRetryPayment}>
                  Thử lại
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="contact-info-section">
            <h2 className="section-title">Thông tin liên hệ gia sư</h2>

            <div className="tutor-info">
              <h3 className="tutor-name">{tutorData.name}</h3>

              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-label">Số điện thoại:</span>
                  <span className="contact-value">{tutorData.contactInfo?.phone}</span>
                </div>

                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <span className="contact-value">{tutorData.contactInfo?.email}</span>
                </div>

                {tutorData.contactInfo?.zalo && (
                  <div className="contact-item">
                    <span className="contact-label">Zalo:</span>
                    <span className="contact-value">{tutorData.contactInfo.zalo}</span>
                  </div>
                )}
              </div>

              <div className="contact-instructions">
                <h4>Hướng dẫn liên hệ:</h4>
                <p>
                  Vui lòng liên hệ với gia sư qua số điện thoại hoặc email được cung cấp ở trên. Khi liên hệ, hãy đề cập
                  đến yêu cầu của bạn và thông tin từ trang F-Tutor4U để gia sư có thể nhận biết.
                </p>
              </div>

              <button className="back-button" onClick={() => window.history.back()}>
                Quay lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactInformComponent
