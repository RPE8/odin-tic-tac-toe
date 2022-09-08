export type Cell = {
	index: number,
	occupiedBy: Player | null
}

export type GameBoard = {
	cells: Cell[]
}

export type Player = {
	name: string,
	mark: string,
	notify?: (player: Player) => void
}

export enum GameStatuses {
	"Win" = "WIN",
	"Tie" = "TIE",
	"InProgress" = "INPROGRESS",
	"NotStarted" = "NOTSTARTED",
	"Error" = "ERROR"
}

export type State = {
	board: GameBoard,
	players: Player[] | null,
	currentPlayer: Player | null,
	status: GameStatuses
}

export type Game = {
	setPlayers: PlayersSetter,
	setState: StateSetter,
	getState: StateGetter,
	init: (boardContainer: HTMLElement, stateContainer: HTMLElement) => void,
	start: () => void
}

export type Setter<T> = (value: T) => void;
export type Getter<T> = () => T;

export type StateSetter = Setter<State>;
export type StateGetter = Getter<State>;
export type PlayersSetter = Setter<Player[]>

// There is no sense in it, just a try to implement the Revealing Module Pattern
const game: Game = (function() {
	let container: HTMLElement;
	let stContainer: HTMLElement;
	// let gameStatusResolve;
	// let gameStatusReject;
	const winConditions = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	];

	let state: State;

	const nextPlayer = (curr: Player) => {
		if (!state || !state.currentPlayer || !state.players || !state.board) {
			return null;
		}

		const currIndex = state.players.findIndex(player => player === curr);
		if (currIndex === -1 || currIndex + 1 === state.players.length) {
			return state.players[0];
		}

		const nextPlayer = state.players[currIndex + 1];
		return nextPlayer;
	}

	const updateGameStatus = () => {
		const cells = state.board.cells;
		const bWon = winConditions.some(cond => {
			return cond.every(num => {
				return cells.find(cell => { 
						return cell.index === num && cell.occupiedBy === state.currentPlayer
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
		};

		state.status = GameStatuses.InProgress;
	}

	const setPlayers: PlayersSetter = (newPlayers) => {
		state.players = newPlayers;
	}

	const setState: StateSetter = (newState) => {
		state = newState;
	}

	const getState: StateGetter = () => {
		return state;
	}

	const generateCells = (): Cell[] => {
		const cells = [...Array(9)].map((_, i):Cell => {
			return {
				index: i,
				occupiedBy: null
			}
		});
		return cells;
	}

	const setInitialState = (): void => {
		const cells = generateCells();
		
		state = {
			players: null,
			currentPlayer: null,
			board: {
				cells
			},
			status: GameStatuses.NotStarted
		}
	}

	const init = (boardContainer: HTMLElement = container, stateContainer: HTMLElement = stContainer) => {
		if (!boardContainer) return;

		container = boardContainer;
		stContainer = stateContainer;

		setInitialState();
		refreshState();
	}

	const start = (): void => {
		if (!state || !state.players || !state.board ) {
			return;
		}
		state = {
			players: state.players,
			currentPlayer: state.players[0],
			status: GameStatuses.InProgress,
			board: {
				cells: generateCells()
			}
		}
		
		refreshState();
	}

	const refreshState = (): void => {
		renderBoard(container);
		if (state.status === GameStatuses.InProgress && state.currentPlayer) {
			state.currentPlayer.notify?.(state.currentPlayer);
			stContainer.textContent = `Turn of ${state.currentPlayer.name}`
			return;
		}

		if (state.status === GameStatuses.Win && state.currentPlayer) {
			stContainer.innerHTML = `${state.currentPlayer.name} is a winner</br>Select new opponent`
		}
		
		if (state.status === GameStatuses.NotStarted) {
			stContainer.textContent = `Select opponent`;
		}

	} 

	const onCellClick = (event: Event) => {
		if (!state || !state.currentPlayer || !state.players || !state.board) {
			return;
		}

		if (state.status !== GameStatuses.InProgress) {
			return;
		}
		const cellElement = event.target as HTMLElement;
		const index = Number(cellElement.dataset.cellindex);
		const jsCell = state.board.cells.find(cell => cell.index === index);
		if (!jsCell) return;
		jsCell.occupiedBy = state.currentPlayer;
		updateGameStatus();
		if (state.status === GameStatuses.InProgress) state.currentPlayer = nextPlayer(state.currentPlayer);
		refreshState();
	}

	const renderBoard = (container: HTMLElement) => {
		container.replaceChildren();
		const cellsToRender: HTMLElement[] = [];
		state.board.cells.forEach((cell, i) => {
			const cellElement = document.createElement("div") as HTMLElement;
			cellElement.classList.add("cell");
			cellElement.setAttribute("data-cellindex", String(i));
			cellElement.addEventListener("click", onCellClick);
			if (cell.occupiedBy) {
				cellElement.textContent = cell.occupiedBy.mark;
			}
			
			cellsToRender.push(cellElement);
		})
		container.append(...cellsToRender);
	}

	return {
		setPlayers,
		setState,
		getState,
		init,
		start
	};
})();

export {game};