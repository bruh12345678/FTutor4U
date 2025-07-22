"use client"

import AIConnectPage from "../components/ai-connect-page"

export default function AIConnectPageContainer() {
  // Mock user location - in a real app, this would come from geolocation API
  const userLocation = {
    lat: 21.0285,
    lng: 105.8542,
    address: "Hòa Lạc, Thạch Thất, Hà Nội",
  }

  return <AIConnectPage userLocation={userLocation} />
}
