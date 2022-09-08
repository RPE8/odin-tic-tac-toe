// There is no sense in it, just a try to implement the Revealing Module Pattern
const game = (function () {
    let board;
    let players;
    let boardParent;
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
        init: (boardContainer) => {
            if (!boardContainer)
                return;
            board = {
                cells: Array(9).fill({ value: players[1].mark }),
                render: (container) => {
                    let html = "";
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            html += `<div class="cell" data-cell-index="${i * 3 + j}"></div>`;
                        }
                    }
                    container.innerHTML = html;
                }
            };
            board.render(boardContainer);
        }
    };
})();
export { game };
//# sourceMappingURL=game.js.map