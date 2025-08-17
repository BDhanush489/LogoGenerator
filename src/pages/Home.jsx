import { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";

function Home() {
    const [user, setUser] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [name, setName] = useState('')
    const [style, setStyle] = useState('')
    const [color, setColor] = useState('#3B82F6')
    const [secondaryColor, setSecondaryColor] = useState('#10B981')

    const [fontFamily, setFontFamily] = useState('Arial')
    const [logoType, setLogoType] = useState('all')
    // const [logos, setLogos] = useState([])
    const [savedLogos, setSavedLogos] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('generate')
    const [showLoginModal, setShowLoginModal] = useState(false)

    // Mock user data for demo
    useEffect(() => {
        const storedUser = localStorage.getItem('logomaker_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    // OAuth simulation functions


    const navigate = useNavigate();

    const goToGenerate = () => {
        navigate("/generate-logo", {
            state: {
                name,
                style,
                color,
                secondaryColor,
                fontFamily,
                logoType
            }
        });
    };



    const handleGenerate = async () => {
        if (!user) {
            setShowLoginModal(true)
            return
        }

        if (!prompt.trim()) {
            alert('Please enter a description for your logo')
            return
        }

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))

        // const generatedLogos = generateAdvancedLogos(prompt, style, color, secondaryColor, fontFamily, logoType)
        // setLogos(generatedLogos)
        // setLoading(false)
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Tabs */}
                {user && (
                    <div className="flex justify-center mb-8">
                        <div className="bg-white rounded-lg p-1 shadow-sm border">
                            <button
                                onClick={() => setActiveTab('generate')}
                                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${activeTab === 'generate'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Generate Logos
                            </button>
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${activeTab === 'saved'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Saved Logos ({savedLogos.length})
                            </button>
                        </div>
                    </div>
                )}

                {/* Generate Tab */}
                {activeTab === 'generate' && (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Create Professional Logos with AI</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Generate stunning, customizable logos in seconds. Perfect for startups, businesses, and personal projects.
                            </p>
                        </div>

                        {/* Enhanced Input Section */}
                        <div className="max-w-5xl mx-auto bg-white shadow-xl p-8 rounded-2xl mb-8 ">
                            <div className="gap-1">
                                {/* Left Column */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Falcon"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                                            Describe Your Brand
                                        </label>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="e.g., Modern tech startup focused on AI solutions for healthcare..."
                                            rows="3"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 space-y-3">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Style</label>
                                            <select
                                                value={style}
                                                onChange={(e) => setStyle(e.target.value)}
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Any Style</option>
                                                <option value="minimal">Minimal</option>
                                                <option value="modern">Modern</option>
                                                <option value="vintage">Vintage</option>
                                                <option value="bold">Bold</option>
                                                <option value="elegant">Elegant</option>
                                                <option value="playful">Playful</option>
                                                <option value="corporate">Corporate</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Logo Type</label>
                                            <select
                                                value={logoType}
                                                onChange={(e) => setLogoType(e.target.value)}
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="Wordmark">Wordmark</option>
                                                <option value="Lettermark">Lettermark</option>
                                                <option value="Brandmark">Brandmark</option>
                                                <option value="Combination Mark">Combination Mark</option>
                                                <option value="Emblem">Emblem</option>
                                                <option value="Abstract Mark">Abstract Mark</option>
                                                <option value="Mascot Logo">Mascot Logo</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className="space-y-4">
                                    {/* Responsive grid: 1 col on mobile, 2 cols on md+ */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Primary Color
                                            </label>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                    className="w-full sm:w-12 h-12 border border-gray-200 rounded-lg cursor-pointer outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-3 text-sm font-mono outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Secondary Color
                                            </label>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={secondaryColor}
                                                    onChange={(e) => setSecondaryColor(e.target.value)}
                                                    className="w-full sm:w-12 h-12 border border-gray-200 rounded-lg cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={secondaryColor}
                                                    onChange={(e) => setSecondaryColor(e.target.value)}
                                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-3 text-sm font-mono outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Font Family dropdown */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Font Family
                                            </label>
                                            <select
                                                value={fontFamily}
                                                onChange={(e) => setFontFamily(e.target.value)}
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="Arial">Arial</option>
                                                <option value="Helvetica">Helvetica</option>
                                                <option value="Times">Times New Roman</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Courier">Courier New</option>
                                                <option value="Impact">Impact</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Generating Your Perfect Logos...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2" onClick={goToGenerate}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Generate Professional Logos
                                    </div>
                                )}
                            </button>
                        </div>


                        <div className="text-center py-16">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to create amazing logos?</h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-8">
                                Describe your brand, choose your preferences, and let our AI create professional logos for you in seconds.
                            </p>
                            <div className="flex justify-center gap-8 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Multiple variations
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    High quality downloads
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Fully customizable
                                </div>
                            </div>
                        </div>

                    </>
                )}


                {/* Features Section */}
                <div className="mb-4 bg-white rounded-2xl shadow-lg p-12">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose LogoMaker Pro?</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Professional-grade logos powered by advanced AI technology
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h4>
                            <p className="text-gray-600">Generate professional logos in seconds, not hours</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Fully Customizable</h4>
                            <p className="text-gray-600">Adjust colors, fonts, styles and more to match your brand</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">High Quality</h4>
                            <p className="text-gray-600">Download in PNG, SVG, and PDF formats for any use case</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;

