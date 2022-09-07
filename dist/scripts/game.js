const gameboard = {
    cells: Array(7).fill({ value: "HEH" })
};
// There is no sense in it, just a try to implement the Revealing Module Pattern
const game = (function () {
    let board;
    let players;
    return {
        setGameBoard: (newBoard) => {
            board = newBoard;
        },
        getGameBoard: () => {
            return board;
        },
        setPlayers: (newPlayers) => {
            players = newPlayers;
        },
        getPlayers: () => {
            return players;
        }
    };
})();
export { game };
//# sourceMappingURL=game.js.map