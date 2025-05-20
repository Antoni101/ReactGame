import { useState, useEffect } from 'react'

function GamePlayer() {
    const [player, setPlayer] = useState({
        mining: null,
        smelting: null,
        money: 0,
        rocks: 0,
        bars: 0,
        x: 50,
        y: 90,
    });

    function checkMining() {
        if (player.x < 16) {
            setPlayer(prev => ({ ...prev, mining: true }));
        } else {
            setPlayer(prev => ({ ...prev, mining: false }));
        }
    }

    function checkSmelting() {
        if (player.x >= 60 && player.x <= 75) {
            setPlayer(prev => ({ ...prev, smelting: true }));
        } else {
            setPlayer(prev => ({ ...prev, smelting: false }));
        }
    }

    useEffect(() => {
        if (player.mining) {
            const interval = setInterval(() => {
            setPlayer(prev => ({ ...prev, rocks: prev.rocks + 1 }));
            }, 800); // every 0.8 second

            return () => clearInterval(interval); // cleanup
        }
    }, [player.mining]);

    useEffect(() => {
        if (player.smelting && player.rocks >= 3) {
            const interval = setInterval(() => {
            setPlayer(prev => {
                if (prev.rocks <= 3) return prev;
                    return { ...prev, rocks: prev.rocks - 3, bars: prev.bars + 1 };
                });
            }, 2000); // every 2 second

            return () => clearInterval(interval); // cleanup
        }
    }, [player.smelting]);


    useEffect(() => {
        checkMining();
        checkSmelting();
    }, [player.x]);

    function jump() {
        setPlayer(prev => {
            if (prev.y < 90) return prev; 
            let i = -0.5;
            const gravity = setInterval(() => {
                movePlayer(0, i);
                i += 0.05;
                setPlayer(p => {
                    if (p.y == 90 || p.y <= 6) clearInterval(gravity);
                        return p;
                    });
            }, 15);

            return prev; // no change on this initial check
        });
    }

    let aInterval = null;
    let dInterval = null;
    let sInterval = null;
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'a' && !aInterval) {
                aInterval = setInterval(() => {
                    movePlayer(-1, 0); // left
                }, 20);
            }
            if (e.key === 'd' && !dInterval) {
                dInterval = setInterval(() => {
                    movePlayer(1, 0); // right
                }, 20);
            }
            if (e.key === 's' && !sInterval) {
                sInterval = setInterval(() => {
                    movePlayer(0, 1); // down
                }, 20);
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
            if (e.key === 's' && sInterval) {
                clearInterval(sInterval);
                sInterval = null;
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
            <div>
                <div className="absolute rounded-lg w-10 h-20 border-2 border-dotted border-black text-white"
                    style={{ top: `${player.y}%`, left: `${player.x}%`, }}>
                </div>
            </div>

            <div className="absolute text-sm w-30 h-8 text-black text-center"
                style={{ top: `${player.y - 3}%`, left: `${player.x - 4.5}%`, }}>
                X: {player.x}% Y: {player.y.toFixed(0)}%
            </div>

            <div className="absolute text-sm w-20 h-8 text-black text-center"
                style={{ top: `${player.y - 5}%`, left: `${player.x - 2.5}%`, }}>
                Rocks: {player.rocks}
            </div>

            <div className="absolute text-sm w-20 h-8 text-black text-center"
                style={{ top: `${player.y - 7}%`, left: `${player.x - 2.5}%`, }}>
                Bars: {player.bars}
            </div>
        </div>
    );
}

export default GamePlayer