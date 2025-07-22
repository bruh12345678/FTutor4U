"use client"

import PromotionPage from "../components/promotion-page"

export default function PromotionPageContainer() {
  const handleStartSession = (sessionId: string) => {
    console.log("Started session:", sessionId)
    // You can add additional session tracking logic here
  }

  return <PromotionPage onStartSession={handleStartSession} />
}
