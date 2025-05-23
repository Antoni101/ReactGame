import { useState, useEffect } from 'react';

function GameNpc({ setMoney, sellValue, smeltSpeed }) {
  const [npc, setNpc] = useState({
    mining: null,
    smelting: null,
    selling: null,
    mineSpeed: 500,
    rocks: 0,
    bars: 0,
    x: 70,
    moveSpeed: 10,
    zone: 1,
    zoning: false
  });

  const ZONES = {
    MINE: 12,
    SMELT: 50,
    SELL: 83
  };

  useEffect(() => {
    if (npc.mining) {
      const interval = setInterval(() => {
        setNpc(prev => ({ ...prev, rocks: prev.rocks + 1 }));
      }, npc.mineSpeed);
      return () => clearInterval(interval);
    }
  }, [npc.mining]);

  useEffect(() => {
    if (npc.smelting && npc.rocks >= 3) {
      const interval = setInterval(() => {
        setNpc(prev => {
          if (prev.rocks < 3) return prev;
          return {
            ...prev,
            rocks: prev.rocks - 3,
            bars: prev.bars + 1
          };
        });
      }, smeltSpeed);
      return () => clearInterval(interval);
    }
  }, [npc.smelting]);

  useEffect(() => {
    if (npc.selling && npc.bars > 0) {
      const interval = setInterval(() => {
        setNpc(prev => {
          if (prev.bars <= 0) return prev;
          setMoney(m => m + sellValue);
          return {
            ...prev,
            bars: prev.bars - 1
          };
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [npc.selling, npc.bars]);

  useEffect(() => {
    if (!npc.zoning) {
      let targetX = 70;
      if (npc.zone === 1) targetX = ZONES.MINE;
      else if (npc.zone === 2) targetX = ZONES.SMELT;
      else if (npc.zone === 3) targetX = ZONES.SELL;

      moveNpc(targetX);
      setNpc(prev => ({ ...prev, zoning: true }));
    }
  }, [npc.zone]);

  useEffect(() => {
    if (!npc.zoning) updateZone();
  }, [npc.rocks, npc.bars, npc.zoning]);

  function updateZone() {
    if (npc.rocks >= 15 && npc.zone !== 2) {
      setNpc(p => ({ ...p, zone: 2 }));
    } else if (npc.bars >= 5 && npc.zone !== 3) {
      setNpc(p => ({ ...p, zone: 3 }));
    } else if (npc.rocks < 3 && npc.bars === 0 && npc.zone !== 1) {
      setNpc(p => ({ ...p, zone: 1 }));
    }
  }

  function checkZones(x) {
    setNpc(prev => ({
      ...prev,
      mining: x <= 13,
      selling: x >= 82,
      smelting: x >= 42 && x <= 57
    }));
  }

  useEffect(() => {
    checkZones(npc.x);
  }, [npc.x]);

  function moveNpc(goX) {
    const step = Math.random() * (0.15 - 0.05) + 0.05;
    const npcMoving = setInterval(() => {
      setNpc(prev => {
        let newX = prev.x;
        if (prev.x > goX) newX -= step;
        else if (prev.x < goX) newX += step;

        const reached = Math.abs(newX - goX) < 0.1;
        if (reached) {
          clearInterval(npcMoving);
          return { ...prev, x: goX, zoning: false };
        }

        return { ...prev, x: newX };
      });
    }, npc.moveSpeed);
  }

  return (
    <div>
      <div className="absolute rounded-xl w-10 h-20 bg-black" style={{ top: `90%`, left: `${npc.x}%` }} />
      <div className="absolute text-sm w-20 h-8 font-black text-gray-600 text-center" style={{ top: `87%`, left: `${npc.x - 2.5}%` }}>
        Rocks: {npc.rocks}
      </div>
      <div className="absolute text-sm w-20 h-8 font-bold text-gray-400 text-center" style={{ top: `85%`, left: `${npc.x - 2.5}%` }}>
        Bars: {npc.bars}
      </div>
    </div>
  );
}

export default GameNpc;
