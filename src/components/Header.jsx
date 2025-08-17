import React, { useEffect, useState } from "react";

function Header() {
    const [user, setUser] = useState(null);
    console.log(user);

    //Checking user variable 
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    //Handling logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <div>
            {/* Navigation Header */}
            <nav className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">

                        {/* Logo Section */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                </svg>
                            </div>

                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                LogoMaker
                            </h1>

                        </div>

                        {/* Auth Section */}
                        <div className="flex items-center gap-4">
                            {user ? (
                                <>
                                    <img
                                        src={user.picture}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full "
                                    />
                                    <span className="font-medium">{user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                                >
                                    Sign In
                                </button>
                            )}
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
