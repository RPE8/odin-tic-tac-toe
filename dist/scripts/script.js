import { game } from "./game.js";
const boardContainer = document.querySelector(".main__board-container");
const players = [{ name: "player1", mark: "X" }, { name: "player2", mark: "S" }];
game.setPlayers(players);
game.init(boardContainer);
//# sourceMappingURL=script.js.map