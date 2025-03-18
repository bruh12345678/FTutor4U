/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import "./LoginScreenContainer.css";

const LoginScreenContainer = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        if (!email.endsWith("@fpt.edu.vn")) {
            setError("Only @fpt.edu.vn emails are allowed");
            return;
        }
        console.log("Logging in with:", { email, password });
        // Proceed with login logic here
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    // const handleGoogleSuccess = (credentialResponse: any) => {
    //     const decoded: any = jwtDecode(credentialResponse.credential);
    //     if (!decoded.email.endsWith("@fpt.edu.vn")) {
    //         setError("Only @fpt.edu.vn emails are allowed");
    //         return;
    //     }

    //     console.log("Email:", decoded.email);

    //     console.log("Google login success:", credentialResponse);
    //     // Handle successful login here
    // };

    // const handleGoogleError = () => {
    //     console.error("Google login failure");
    //     // Handle login failure here
    // };

    return (
        // <GoogleOAuthProvider clientId="435518504028-9ab5m49sf1qhp8v3th2imc3s9570abv0.apps.googleusercontent.com">
        <div className="login-container">
            <div className="smaller_container">
                {/* Left Side - Login Form */}
                <div className="left">
                    <h2>Login to Your Account</h2>

                    {/* Social Login Buttons */}

                    {error && (
                        <p className="error" style={{ color: "red" }}>
                            {error}
                        </p>
                    )}

                    {/* Email and Password Fields */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                    </form>

                </div>

                {/* Right Side - Signup Section */}
                <div className="right">
                    <h3>New Here?</h3>
                    <p>
                        Sign up and discover a great amount of new
                        opportunities!
                    </p>
                    <button className="signup-button" onClick={handleSignUp}>
                        Sign Up
                    </button>
                </div>
            </div>
        /</div>
    );
};

export default LoginScreenContainer;
