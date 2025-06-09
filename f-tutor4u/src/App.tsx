/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingContainer from "./screens/landingScreen/landingContainer/landingContainer"
import NewClassScreenContainer from "./screens/newClassScreen/newClassContainer/NewClassScreenContainer";
import Navigation from "./core/component/navbar/Navigation";
import PostDetailContainer from "./screens/postDetailScreen/postDetailContainer/PostDetailContainer";
import FindTutorContainer from "./screens/findTutorScreen/findTutorContainer/FindTutorContainer";
import ContactInformScreen from "./screens/contactInformScreen/contactInformComponent/contactInformScreen/ContactInformScreen";
import TutorRegisterContainer from "./screens/tutorRegisterScreen/tutorRegisterContainer/FindTutorContainer";
import TutorsPage from "./screens/tutorsScreen/TutorPage";
import StudentInformContainer from "./screens/studentInformScreen/studentInformContainer/StudentInformContainer";
import TutorInformContainer from "./screens/tutorInformScreen/tutorInformContainer/TutorInformContainer";
import ApplicationStatusScreen from "./screens/applicationStatusScreen/applicationStatusScreen/applicationStatusScreen";

import { navigationData } from "./core/const/Const";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true)
    setUser(userData)
    console.log("User logged in:", userData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    console.log("User logged out")
  }

  return (
    <>
      <Navigation
        {...navigationData}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingContainer />} />
          <Route path="/landing" element={<LandingContainer />} />
          <Route path="/new-class" element={<NewClassScreenContainer />} />
          <Route path="/post-detail" element={<PostDetailContainer />} />
          <Route path="/find-tutor" element={<FindTutorContainer />} />
          <Route path="/contact-inform" element={<ContactInformScreen tutorId={"1"}  />} />
          <Route path="/register-tutor" element={<TutorRegisterContainer />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/student-inform" element={<StudentInformContainer />} />
          <Route path="/tutor-inform" element={<TutorInformContainer />} />
          <Route path="/application-status" element={<ApplicationStatusScreen />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;