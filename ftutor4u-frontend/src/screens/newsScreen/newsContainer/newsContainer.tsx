import React from "react";
import "./newsScreen.css";
import Header from "../../../core/components/header/navBar";

const NewsScreenContainer: React.FC = () => {
  return (
      <><Header />
      <div className="news-content">
      <aside className="news-filter">
        <button className="filter-btn">Filter</button>
        <button className="filter-option">Find tutor</button>
        <button className="filter-option">Find student</button>
        <button className="filter-option">Subject</button>
        <button className="filter-option highlight">Affordability</button>
        <div className="range-filter">
          <span>From:</span> <input type="text" className="filter-input" />
          <span>To:</span> <input type="text" className="filter-input" />
        </div>
        <button className="filter-option">Area</button>
        <button className="filter-option">Time</button>
      </aside>
      <main className="news-list">
        <div className="news-item">News</div>
        <div className="news-item">News</div>
        <div className="news-item">News</div>
        <div className="news-item">News</div>
      </main>
      <aside className="news-sidebar">
        <ul>
          <li className="sidebar-item">
            <a href="/profile">Your profile</a>
          </li>
          <li className="sidebar-item">Your CV</li>
          <li className="sidebar-item">See your Tutor/Student</li>
          <li className="sidebar-item">Request/Applying</li>
          <li className="sidebar-item">Post a news</li>
          <li className="sidebar-item">Make question</li>
          <li className="sidebar-item">Rating tutor</li>
          <li className="sidebar-item">Report</li>
          <li className="sidebar-item">Payment</li>
        </ul>
      </aside>
    </div></>
  );
};

export default NewsScreenContainer;