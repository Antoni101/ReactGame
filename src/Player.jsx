import { useState, useEffect } from 'react';

function GamePlayer({ setMoney, sellValue, smeltSpeed }) {
    const [player, setPlayer] = useState({
        mining: null,
        smelting: null,
        selling: null,
        mineSpeed: 250,
        rocks: 0,
        bars: 0,
        x: 30,
        y: 90,
    });

    function checkZones(x) {
        setPlayer(prev => ({
            ...prev,
            mining: x <= 13,
            selling: x >= 82,
            smelting: x >= 42 && x <= 57,
        }));
    }

    useEffect(() => {
        if (player.mining) {
            const interval = setInterval(() => {
                setPlayer(prev => ({ ...prev, rocks: prev.rocks + 1 }));
            }, player.mineSpeed);
            return () => clearInterval(interval);
        }
    }, [player.mining]);

    useEffect(() => {
        if (player.smelting && player.rocks >= 3) {
            const interval = setInterval(() => {
                setPlayer(prev => {
                    if (prev.rocks < 3) return prev;
                    return { ...prev, rocks: prev.rocks - 3, bars: prev.bars + 1 };
                });
            }, smeltSpeed);
            return () => clearInterval(interval);
        }
    }, [player.smelting]);

    useEffect(() => {
        if (player.selling && player.bars > 0) {
            const interval = setInterval(() => {
                setPlayer(prev => {
                    if (prev.bars <= 0) return prev;
                    setMoney(m => m + sellValue);
                    return { ...prev, bars: prev.bars - 1 };
                });
            }, 500);
            return () => clearInterval(interval);
        }
    }, [player.selling, player.bars]);

    useEffect(() => {
        checkZones(player.x);
    }, [player.x]);

    function jump() {
        setPlayer(prev => {
            if (prev.y < 90) return prev;
            let i = -0.5;
            const gravity = setInterval(() => {
                movePlayer(0, i);
                i += 0.05;
                setPlayer(p => {
                    if (p.y === 90 || p.y <= 6) clearInterval(gravity);
                    return p;
                });
            }, 15);
            return prev;
        });
    }

    let aInterval = null;
    let dInterval = null;
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'a' && !aInterval) {
                aInterval = setInterval(() => movePlayer(-1, 0), 20);
            }
            if (e.key === 'd' && !dInterval) {
                dInterval = setInterval(() => movePlayer(1, 0), 20);
            }
            if (e.key === 'w') jump();
        }
        function handleKeyUp(e) {
            if (e.key === 'a' && aInterval) {
                clearInterval(aInterval);
                aInterval = null;
            }
            if (e.key === 'd' && dInterval) {
                clearInterval(dInterval);
                dInterval = null;
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    function movePlayer(deltaX, deltaY) {
        setPlayer(prev => ({
            ...prev,
            x: Math.min(95, Math.max(0, prev.x + deltaX)),
            y: Math.min(90, Math.max(0, prev.y + deltaY)),
        }));
    }

    return (
        <div>
            <div className="absolute bg-white rounded-lg w-10 h-20"
                style={{ top: `${player.y}%`, left: `${player.x}%` }} />
            <div className="absolute text-sm w-20 h-8 font-black text-gray-600 text-center"
                style={{ top: `${player.y - 3}%`, left: `${player.x - 2.5}%` }}>
                Rocks: {player.rocks}
            </div>
            <div className="absolute text-sm w-20 h-8 font-bold text-gray-400 text-center"
                style={{ top: `${player.y - 5}%`, left: `${player.x - 2.5}%` }}>
                Bars: {player.bars}
            </div>
        </div>
    );
}

export default GamePlayer;
