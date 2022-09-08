export type Cell = {
	value: string
}

export type GameBoard = {
	cells: Cell[],
	render: (container: HTMLElement) => void
}

export type Player = {
	name: string,
	mark: string,
	notify?: (player: Player) => void
}

export type Game = {
	setGameBoard: BoardSetter,
	getGameBoard: BoardGetter,
	setPlayers: PlayersSetter,
	getPlayers: PlayersGetter,
	init: (boardContainer: HTMLElement, players: Player[]) => void
}

export type Setter<T> = (value: T) => void;
export type Getter<T> = () => T;

export type BoardSetter = Setter<GameBoard>;
export type BoardGetter = Getter<GameBoard>;
export type PlayersSetter = Setter<Player[]>;
export type PlayersGetter = Getter<Player[]>;

// There is no sense in it, just a try to implement the Revealing Module Pattern
const game: Game = (function() {
	let board: GameBoard;
	let players: Player[];
	let boardParent: HTMLElement;
	let currentPlayer: Player;

	let nextPlayer = (curr: Player) => {
		const currIndex = players.findIndex(player => player === curr);
		if (currIndex === -1 || currIndex + 1 === players.length) {
			return players[0];
		}

		const nextPlayer = players[currIndex + 1];
		return nextPlayer;
	}

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
			if (!boardContainer) return;
			if (!newPlayers) return;

			players = newPlayers;
			currentPlayer = players[0];


			board = {
				cells: Array(9).fill({value: players[1].mark}),
				render: (container) => {
					let cells = [];
					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							const cell = document.createElement("div");
							cell.classList.add("cell");
							cell.setAttribute("data-cell-index", String(i * 3 + j));
							cell.addEventListener("click", (event) => {
								const target = event.target as HTMLElement; 
								if (target.textContent) return;
								target.textContent = currentPlayer?.mark;
								currentPlayer = nextPlayer(currentPlayer);
								currentPlayer?.notify?.(currentPlayer);
							})
							cells.push(cell);
						}
					}
					container.append(...cells);
				}
			}

			board.render(boardContainer);
			currentPlayer?.notify?.(currentPlayer);
		}
		
	};
})();

export {game};