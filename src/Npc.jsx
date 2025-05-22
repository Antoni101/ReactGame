import { useState, useEffect } from 'react'

function GameNpc() {
    const [npc, setNpc] = useState({
        mining: null,
        smelting: null,
        selling: null,
        mineSpeed: 1000,
        rocks: 0,
        bars: 0,
        x: 70,
        moveSpeed: 100
    });

    function checkMining() {
        if (npc.x <= 13) {
            setNpc(prev => ({ ...prev, mining: true }));
        } else {
            setNpc(prev => ({ ...prev, mining: false }));
        }
    }

    function checkSelling() {
        if (npc.x >= 82) {
            setNpc(prev => ({ ...prev, selling: true }));
        } else {
            setNpc(prev => ({ ...prev, selling: false }));
        }
    }

    function checkSmelting() {
        if (npc.x >= 42 && npc.x <= 57) {
            setNpc(prev => ({ ...prev, smelting: true }));
        } else {
            setNpc(prev => ({ ...prev, smelting: false }));
        }
    }

    useEffect(() => {
        if (npc.mining) {
            const interval = setInterval(() => {
            setNpc(prev => ({ ...prev, rocks: prev.rocks + 1 }));
            }, npc.mineSpeed); // every second

            return () => clearInterval(interval); // cleanup
        }
    }, [npc.mining]);

    useEffect(() => {
        if (npc.smelting && npc.rocks >= 3) {
            const interval = setInterval(() => {
            setNpc(prev => {
                if (prev.rocks < 3) return prev;
                    return { ...prev, rocks: prev.rocks - 3, bars: prev.bars + 1 };
                });
            }, 2000); // every 2 second

            return () => clearInterval(interval); // cleanup
        }
    }, [npc.smelting]);

    useEffect(() => {
        if (npc.selling && npc.bars > 0) {
            const interval = setInterval(() => {
            setNpc(prev => {
                if (prev.bars <= 0) return prev;
                    return {
                        ...prev, 
                        bars: prev.bars - 1,
                        money: prev.money + prev.sellValue 
                    };
                });
            }, 500); // every second

            return () => clearInterval(interval); // cleanup
        }
    }, [npc.selling]);


    useEffect(() => {
        checkMining();
        checkSmelting();
        checkSelling();
    }, [npc.x]);

    let aInterval = null;
    let dInterval = null;

    function moveNpc(goX) {
        const npcMoving = setInterval(function () {
            setNpc(prev => {
                let newX = prev.x;

                if (npc.x > goX) {
                    newX = prev.x - 0.5;
                } else if (npc.x < goX) {
                    newX = prev.x + 0.5;
                }

                // Stop moving if close enough (within 0.5 units)
                if (Math.abs(newX - goX) < 0.5) {
                    newX = goX;
                    clearInterval(npcMoving);
                }

                return {
                    ...prev,
                    x: newX
                };
            });
        }, npc.moveSpeed);
    }

    return (
        <div>
            <div>
                <div className="absolute rounded-lg w-10 h-20 border-2 border-dotted border-black text-white"
                    style={{ top: `${90}%`, left: `${npc.x}%`, }}>
                </div>
            </div>

            <div className="absolute text-sm w-30 h-8 text-black text-center"
                style={{ top: `${87}%`, left: `${npc.x - 4.5}%`, }}>
                X: {npc.x}%
            </div>

            <div className="absolute text-sm w-20 h-8 text-black text-center"
                style={{ top: `${85}%`, left: `${npc.x - 2.5}%`, }}>
                Rocks: {npc.rocks}
            </div>

            <div className="absolute text-sm w-20 h-8 text-black text-center"
                style={{ top: `${83}%`, left: `${npc.x - 2.5}%`, }}>
                Bars: {npc.bars}
            </div>
        </div>
    );
}

export default GameNpc