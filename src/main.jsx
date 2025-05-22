import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import GamePlayer from './Player.jsx'
import Mine from './Mine.jsx'
import Smelter from './Smelter.jsx'
import Sell from './Sell.jsx'
import GameNpc from './Npc.jsx'
import './index.css'

function GameArea() {

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-gray-300 relative w-200 h-200 text-white">
        <GamePlayer/>
        <GameNpc/>
        <Mine />
        <Smelter />
        <Sell />
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
