import { useState, useEffect } from 'react'

function GamePlayer() {
    const [player, setPlayer] = useState({
        name: "Hero",
        hp: 100,
        attack: 10,
        x: 50,
        y: 90,
        yMax: 90,
        xMax: 95,
    });

    function jump() {
        setPlayer(prev => {
            if (prev.y < prev.yMax) return prev; // ⛔ already midair
            let i = -1;
            const gravity = setInterval(() => {
                movePlayer(0, i);
                i += 0.05;
                setPlayer(p => {
                    if (p.y === p.yMax) clearInterval(gravity);
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
            x: Math.min(player.xMax, Math.max(0, prev.x + deltaX)),
            y: Math.min(player.yMax, Math.max(0, prev.y + deltaY)),
        }));
    }

    return (
        <div className="absolute rounded-md w-10 h-20 border-2 border-dotted border-black text-white"
            style={{
                top: `${player.y}%`,
                left: `${player.x}%`,
            }}
        ></div>
    );
}

export default GamePlayer