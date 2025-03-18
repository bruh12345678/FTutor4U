import React from "react";
import "./ProfileScreenContainer.css";
import Header from "../../../core/components/header/navBar";

const ProfileScreenContainer: React.FC = () => {
  return (
    <>
      <Header />
      <div className="profile-container">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar">Avatar</div>
        </div>

        {/* Information Section */}
        <div className="info-section">
          <div className="name-banner">Tutor/Student Name</div>
          <div className="info-grid">
            <div className="info-item">ID</div>
            <div className="info-item">Achievement</div>
            <div className="info-item">Semester</div>
            <div className="info-item">Description</div>
            <div className="info-item">Major</div>
            <div className="info-item">CV</div>
            <div className="info-item">Address</div>
            <div className="info-item">Support in Subject</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreenContainer;
