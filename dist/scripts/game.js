// There is no sense in it, just a try to implement the Revealing Module Pattern
const game = (function () {
    let board;
    let players;
    let boardParent;
    let currentPlayer;
    let nextPlayer = (curr) => {
        const currIndex = players.findIndex(player => player === curr);
        if (currIndex === -1 || currIndex + 1 === players.length) {
            return players[0];
        }
        return players[currIndex + 1];
    };
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
        },
        init: (boardContainer, newPlayers) => {
            if (!boardContainer)
                return;
            if (!newPlayers)
                return;
            players = newPlayers;
            currentPlayer = players[0];
            board = {
                cells: Array(9).fill({ value: players[1].mark }),
                render: (container) => {
                    let cells = [];
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            const cell = document.createElement("div");
                            cell.classList.add("cell");
                            cell.setAttribute("data-cell-index", String(i * 3 + j));
                            cell.addEventListener("click", (event) => {
                                const target = event.target;
                                if (target.textContent)
                                    return;
                                target.textContent = currentPlayer?.mark;
                                currentPlayer = nextPlayer(currentPlayer);
                            });
                            cells.push(cell);
                        }
                    }
                    container.append(...cells);
                }
            };
            board.render(boardContainer);
        }
    };
})();
export { game };
//# sourceMappingURL=game.js.map