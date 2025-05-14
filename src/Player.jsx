function GamePlayer() {
    const [player, setPlayer] = useState({
        name: "Hero",
        hp: 100,
        attack: 10,
        x: 95,
        y: 90
    });

    function movePlayer(deltaX, deltaY) {
        setPlayer(prev => ({
            ...prev,
            x: Math.min(95, Math.max(0, prev.x + deltaX)),
            y: Math.min(90, Math.max(0, prev.y + deltaY)),
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