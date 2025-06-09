/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Link, useLocation } from "react-router-dom"
import type React from "react"
import { useState } from "react"
import "./Navigation.css"
import phoneIcon from "../../../assets/phone-alt.png"
import emailIcon from "../../../assets/envelope.png"
import userIcon from "../../../assets/user.png"
import logoImage from "../../../assets/logo.png"
import LoginDialogContainer from "../../../screens/loginScreen/loginContainer/LoginDialogContainer"

interface NavigationProps {
  phoneNumber: string
  email: string
  menuItems: Array<{
    label: string
    path: string
  }>
  isLoggedIn: boolean
  user?: any
  onLogin: (user: any) => void
  onLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  menuItems,
  phoneNumber,
  email,
  isLoggedIn,
  user,
  onLogin,
  onLogout,
}) => {
  const location = useLocation()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLoggedIn) {
      onLogout()
    } else {
      setShowLoginDialog(true)
    }
  }

  const handleLoginSuccess = (userData: any) => {
    onLogin(userData)
    setShowLoginDialog(false)
  }

  return (
    <>
      <header className="navbar">
        {/* Top Bar */}
        <div className="navbar-top">
          <div className="navbar-container navbar-top-inner">
            <div className="navbar-contact">
              <span className="navbar-contact-item">
                <img src={phoneIcon || "/placeholder.svg"} alt="Phone" className="navbar-icon" />
                {phoneNumber}
              </span>
              <span className="navbar-contact-item">
                <img src={emailIcon || "/placeholder.svg"} alt="Email" className="navbar-icon" />
                {email}
              </span>
            </div>
            <div className="navbar-auth">
              {isLoggedIn && user ? (
                <div className="navbar-user-menu">
                  <span className="navbar-user-greeting">
                    <img src={userIcon || "/placeholder.svg"} alt="User" className="navbar-icon" />
                    Xin chào, {user.name}
                  </span>
                  <button className="navbar-logout-btn" onClick={handleLoginClick}>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <a href="#" className="navbar-login" onClick={handleLoginClick}>
                  <img src={userIcon || "/placeholder.svg"} alt="Login" className="navbar-icon" />
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <nav className="navbar-main">
          <div className="navbar-container navbar-main-inner">
            <Link to="/landing" className="navbar-logo-link">
              <img src={logoImage || "/placeholder.svg"} alt="Logo" className="navbar-logo" />
            </Link>
            <ul className="navbar-menu">
              {menuItems.map((item, index) => (
                <li key={index} className="navbar-menu-item">
                  <Link to={item.path} className={`navbar-link ${location.pathname === item.path ? "active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <LoginDialogContainer
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}

export default Navigation
