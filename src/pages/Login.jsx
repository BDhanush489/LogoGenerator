import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //   // Google login error
    const handleGoogleError = () => {
        console.error("Google Login Failed");
    };
    
    // Google login success
    const handleGoogleSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);

        console.log("Google Login Success:", decoded);

        // Save user info to localStorage
        localStorage.setItem("user", JSON.stringify(decoded));

        window.location.href = "/";
    };

    // Email/password login handler
    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            name: email.split("@")[0], // Fake name for now
            picture: "https://via.placeholder.com/40" // Replace with backend image later
        };

        localStorage.setItem("user", JSON.stringify(userData));

        window.location.href = "/";
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Login to LogoMaker Pro
                </h2>

                {/* Google OAuth Button */}
                <div className="flex justify-center mb-5">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                    />
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-2 text-sm text-gray-500">or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Email/Password Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
