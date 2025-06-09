import HeroSection from '../landingComponent/HeroSection'
import WhyChooseUsSection from '../landingComponent/WhyChooseUsSection'


import backgroundImage from '../../../assets/why-choose-us.jpg';
import floatingImage from '../../../assets/why_choose_us_picture_1.png';


interface LandingContainerProps {
  onSearch?: (subject: string) => void
  onJoinAsTutor?: () => void
}

export default function LandingContainer({ onSearch, onJoinAsTutor }: LandingContainerProps) {
  const handleSearch = (subject: string) => {
    console.log("Searching for subject:", subject)
    if (onSearch) {
      onSearch(subject)
    }
    // You can add navigation logic here
    // For example: navigate to search results page
  }

  const handleJoinAsTutor = () => {
    console.log("Join as tutor clicked")
    if (onJoinAsTutor) {
      onJoinAsTutor()
    }
    // You can add navigation logic here
    // For example: navigate to tutor registration page
  }

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <HeroSection
        backgroundImage={backgroundImage}
        onSearch={handleSearch}
        onJoinAsTutor={handleJoinAsTutor}
      />
      <WhyChooseUsSection
        backgroundImage={backgroundImage}
        floatingImage={floatingImage}
      />
    </div>
  )
}
