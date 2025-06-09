import type React from "react"
import "./ContactInformScreen.css"
import ContactInformContainer from "../../contactInformContainer/ContactInformContainer"

interface ContactInformScreenProps {
  postId?: string
  tutorId: string
}

const ContactInformScreen: React.FC<ContactInformScreenProps> = ({ postId, tutorId }) => {
  return (
    <div className="contact-inform-screen-wrapper">
      <ContactInformContainer postId={postId} tutorId={tutorId} />
    </div>
  )
}

export default ContactInformScreen
