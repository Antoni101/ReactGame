import { useState } from 'react'
import './App.css'
import GamePlayer from './Player.jsx'



function GameArea() {

  return (
  <div className="flex items-center justify-center h-screen w-screen">
    <div className="relative w-200 h-200 border-2 border-solid border-black text-white">
      <GamePlayer />
    </div>
  </div>
  );
}

function App() {
  return <GameArea />
}

export default App
