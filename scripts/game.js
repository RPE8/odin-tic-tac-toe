export var GameStatuses;
(function (GameStatuses) {
    GameStatuses["Win"] = "WIN";
    GameStatuses["Tie"] = "TIE";
    GameStatuses["InProgress"] = "INPROGRESS";
    GameStatuses["NotStarted"] = "NOTSTARTED";
    GameStatuses["Error"] = "ERROR";
})(GameStatuses || (GameStatuses = {}));
// There is no sense in it, just a try to implement the Revealing Module Pattern
const game = (function () {
    let container;
    let stContainer;
    // let gameStatusResolve;
    // let gameStatusReject;
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let state;
    const nextPlayer = (curr) => {
        if (!state || !state.currentPlayer || !state.players || !state.board) {
            return null;
        }
        const currIndex = state.players.findIndex(player => player === curr);
        if (currIndex === -1 || currIndex + 1 === state.players.length) {
            return state.players[0];
        }
        const nextPlayer = state.players[currIndex + 1];
        return nextPlayer;
    };
    const updateGameStatus = () => {
        const cells = state.board.cells;
        const bWon = winConditions.some(cond => {
            return cond.every(num => {
                return cells.find(cell => {
                    return cell.index === num && cell.occupiedBy === state.currentPlayer;
                });
            });
        });
        if (bWon) {
            state.status = GameStatuses.Win;
            return;
        }
        if (!cells.find(cell => cell.occupiedBy === null)) {
            state.status = GameStatuses.Tie;
            return;
        }
        ;
        state.status = GameStatuses.InProgress;
    };
    const setPlayers = (newPlayers) => {
        state.players = newPlayers;
    };
    const setState = (newState) => {
        state = newState;
    };
    const getState = () => {
        return state;
    };
    const generateCells = () => {
        const cells = [...Array(9)].map((_, i) => {
            return {
                index: i,
                occupiedBy: null
            };
        });
        return cells;
    };
    const setInitialState = () => {
        const cells = generateCells();
        state = {
            players: null,
            currentPlayer: null,
            board: {
                cells
            },
            status: GameStatuses.NotStarted
        };
    };
    const init = (boardContainer = container, stateContainer = stContainer) => {
        if (!boardContainer)
            return;
        container = boardContainer;
        stContainer = stateContainer;
        setInitialState();
        refreshState();
    };
    const start = () => {
        if (!state || !state.players || !state.board) {
            return;
        }
        state = {
            players: state.players,
            currentPlayer: state.players[0],
            status: GameStatuses.InProgress,
            board: {
                cells: generateCells()
            }
        };
        refreshState();
    };
    const refreshState = () => {
        renderBoard(container);
        if (state.status === GameStatuses.InProgress && state.currentPlayer) {
            state.currentPlayer.notify?.(state.currentPlayer);
            stContainer.textContent = `Turn of ${state.currentPlayer.name}`;
            return;
        }
        if (state.status === GameStatuses.Win && state.currentPlayer) {
            stContainer.innerHTML = `${state.currentPlayer.name} is a winner</br>Select new opponent`;
        }
        if (state.status === GameStatuses.NotStarted) {
            stContainer.textContent = `Select opponent`;
        }
    };
    const onCellClick = (event) => {
        if (!state || !state.currentPlayer || !state.players || !state.board) {
            return;
        }
        if (state.status !== GameStatuses.InProgress) {
            return;
        }
        const cellElement = event.target;
        const index = Number(cellElement.dataset.cellindex);
        const jsCell = state.board.cells.find(cell => cell.index === index);
        if (!jsCell)
            return;
        jsCell.occupiedBy = state.currentPlayer;
        updateGameStatus();
        if (state.status === GameStatuses.InProgress)
            state.currentPlayer = nextPlayer(state.currentPlayer);
        refreshState();
    };
    const renderBoard = (container) => {
        container.replaceChildren();
        const cellsToRender = [];
        state.board.cells.forEach((cell, i) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.setAttribute("data-cellindex", String(i));
            cellElement.addEventListener("click", onCellClick);
            if (cell.occupiedBy) {
                cellElement.textContent = cell.occupiedBy.mark;
            }
            cellsToRender.push(cellElement);
        });
        container.append(...cellsToRender);
    };
    return {
        setPlayers,
        setState,
        getState,
        init,
        start
    };
})();
export { game };
//# sourceMappingURL=game.js.map