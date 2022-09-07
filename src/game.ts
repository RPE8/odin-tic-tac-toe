import {Game, GameBoard, Player} from "./types";

const gameboard: GameBoard = {
	cells: Array(7).fill({value: "HEH"})
};

// There is no sense in it, just a try to implement the Revealing Module Pattern
const game: Game = (function() {
	let board: GameBoard;
	let players: Player[]; 

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

export {game};