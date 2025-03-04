import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import Randomizer from "./components/Randomizer.jsx";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Randomizer />
    </div>
  );
}

export default App
