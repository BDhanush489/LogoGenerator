// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       <img src={reactLogo} />

//       <nav>
//         <h1 className=''>Logo Maker</h1>
//       </nav>
//       {/* <h1 className='bg-red-100'>Logo Maker</h1> */}

//       <h1>Login</h1>

//       dr


//     </div>
//   )
// }

// export default App
// 
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header.jsx';
import Home from "./pages/Home.jsx";
import Login from './pages/Login.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import GenerateLogo from "./pages/GenerateLogo";


function App() {
  // const [showLogin, setShowLogin] = useState(false);

  return (
     <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate-logo" element={<GenerateLogo />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App