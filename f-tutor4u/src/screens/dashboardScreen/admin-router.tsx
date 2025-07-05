"use client"

import type { ReactNode } from "react"

interface AdminRouteProps {
  children: ReactNode
  isLoggedIn: boolean
  userRole?: string
}

export default function AdminRoute({ children, isLoggedIn, userRole }: AdminRouteProps) {
  if (!isLoggedIn) {
    return (
      <div className="admin-access-denied">
        <div className="access-denied-container">
          <div className="access-denied-icon">🔒</div>
          <h2>Truy cập bị từ chối</h2>
          <p>Bạn cần đăng nhập để truy cập trang này.</p>
          <button className="login-redirect-btn" onClick={() => (window.location.href = "/")}>
            Về trang chủ
          </button>
        </div>
      </div>
    )
  }

  if (userRole !== "admin") {
    return (
      <div className="admin-access-denied">
        <div className="access-denied-container">
          <div className="access-denied-icon">⚠️</div>
          <h2>Không có quyền truy cập</h2>
          <p>Chỉ có quản trị viên mới có thể truy cập trang này.</p>
          <button className="login-redirect-btn" onClick={() => (window.location.href = "/")}>
            Về trang chủ
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
