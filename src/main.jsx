import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import GamePlayer from './Player.jsx'
import Mine from './Mine.jsx'
import Smelter from './Smelter.jsx'
import Floor from './Floor.jsx'
import Sell from './Sell.jsx'
import './index.css'

function GameArea() {

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-gray-300 relative w-200 h-200 text-white">
        <GamePlayer/>
         <Floor /> <Mine /> <Smelter /> <Sell />
        <div className="absolute w-18 h-195 border-2 border-white"
          style={{ top: `${2.5}%`, left: `${89.5}%`,}}>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <GameArea />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
