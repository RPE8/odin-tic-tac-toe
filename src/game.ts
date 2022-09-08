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
}

export type Game = {
	setGameBoard: BoardSetter,
	getGameBoard: BoardGetter,
	setPlayers: PlayersSetter,
	getPlayers: PlayersGetter,
	init: (boardContainer: HTMLElement) => void
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
			if (!boardContainer) return;
			

			board = {
				cells: Array(9).fill({value: players[1].mark}),
				render: (container) => {
					let html = "";
					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							html += `<div class="cell" data-cell-index="${i * 3 + j}"></div>`		
						}
					}
					container.innerHTML = html;
				}
			}

			board.render(boardContainer);
		}
		
	};
})();

export {game};