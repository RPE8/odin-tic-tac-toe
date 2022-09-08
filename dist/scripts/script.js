import { game } from "./game.js";
const boardContainer = document.querySelector(".main__board-container");
const stateContainer = document.querySelector(".main__state");
const playerButton = document.querySelector(".main__player");
const aiButton = document.querySelector(".main__ai");
playerButton.addEventListener("click", () => {
    game.setPlayers([
        { name: "Player 1", mark: "X" },
        { name: "Player 2", mark: "O" }
    ]);
    game.start();
});
game.init(boardContainer, stateContainer);
//# sourceMappingURL=script.js.map