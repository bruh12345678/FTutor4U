"use client"

import { useState, useEffect } from "react"
import type React from "react"
import ContactInformComponent from "../contactInformComponent/ContactInformComponent"

interface ContactInformContainerProps {
  postId?: string
  tutorId: string
}

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

const ContactInformContainer: React.FC<ContactInformContainerProps> = ({tutorId}) => {
  const [tutorData, setTutorData] = useState<TutorContactData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed" | "failed">("pending")
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false)

  useEffect(() => {
    // Simulate API call to fetch tutor data
    const fetchTutorData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data
        const mockData: TutorContactData = {
          id: tutorId,
          name: "Nguyễn Thanh Hải",
          accountName: "F-tutor4U",
          fee: "5.000 VND",
          qrCodeUrl: "images/qr.jpg?height=200&width=200", // Placeholder QR code
          contactInfo: {
            phone: "0912345678",
            email: "tutor@example.com",
            zalo: "0912345678",
          },
        }

        setTutorData(mockData)
        setError(null)
      } catch (err) {
        console.error("Error fetching tutor data:", err)
        setError("Failed to load tutor data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTutorData()
  }, [tutorId])

  const handleCheckPayment = () => {
    // Simulate payment verification process
    setPaymentStatus("processing")

    // In a real app, this would be an API call to verify payment
    setTimeout(() => {
      // Randomly simulate success or failure for demo purposes
      const isSuccess = Math.random() > 0.3 // 70% chance of success

      if (isSuccess) {
        setPaymentStatus("completed")
        setShowContactInfo(true)
      } else {
        setPaymentStatus("failed")
      }
    }, 2000)
  }

  const handleRetryPayment = () => {
    setPaymentStatus("pending")
  }

  return (
    
    <ContactInformComponent
      tutorData={tutorData}
      isLoading={isLoading}
      error={error}
      paymentStatus={paymentStatus}
      showContactInfo={showContactInfo}
      onCheckPayment={handleCheckPayment}
      onRetryPayment={handleRetryPayment}
    />
  )
}

export default ContactInformContainer
