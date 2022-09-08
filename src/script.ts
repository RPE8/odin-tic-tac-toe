import {game, GameBoard, Player} from "./game.js";

const boardContainer = document.querySelector(".main__board-container") as HTMLElement;

const players: Player[] = [{name: "player1", mark: "X"}, {name: "player2", mark: "S"}];

game.setPlayers(players)
game.init(boardContainer);