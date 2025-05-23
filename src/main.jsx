import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import GamePlayer from './Player.jsx'
import Mine from './Mine.jsx'
import Smelter from './Smelter.jsx'
import Sell from './Sell.jsx'
import { sellValue } from './Sell.jsx';
import GameNpc from './Npc.jsx'
import './index.css'

function GameArea() {

  const [money, setMoney] = useState(0);
  const [npcs, setNpcs] = useState([]);
  const [npcCost, setNpcCost] = useState(100); 
  const [smeltSpeed, setSmeltSpeed] = useState(1000);


  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-gray-300 relative w-200 h-200 text-white">

        <div className="absolute top-2 left-2 bg-white text-black px-4 py-2 rounded shadow">
          Money: ${money}
        </div>

        <button
          className="absolute top-2 right-2 bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if (money >= npcCost) {
                setMoney(prev => prev - npcCost);
                setNpcCost(prev => prev * 1.5); // doubles each time
                setNpcs(prev => [...prev, {}]);
              }
          }}>
          Buy Miner ${npcCost}
        </button>
        <button
            className="absolute top-14 left-2 bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if (money >= 200 && smeltSpeed >= 100) {
                setMoney(m => m - 200);
                setSmeltSpeed(s => s - 50); // reduces smelt time by 100ms
              }
            }}
          >
          Upgrade Smelter ($200)
        </button>
        <h1 className="absolute top-24 left-2 font-bold text-gray-400 text-center" >
          Smelter Speed: {smeltSpeed}ms
        </h1>


        {npcs.map((_, i) => (
          <GameNpc key={i} setMoney={setMoney} smeltSpeed={smeltSpeed} sellValue={sellValue} />
        ))}
        <GamePlayer setMoney={setMoney} sellValue={sellValue} smeltSpeed={smeltSpeed} />
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
