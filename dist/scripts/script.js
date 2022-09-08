import { game } from "./game.js";
const boardContainer = document.querySelector(".main__board-container");
const stateSection = document.querySelector(".main__state");
const players = [{ name: "Player 1", mark: "X", notify: (player) => {
            stateSection.textContent = `Turn of ${player.name}`;
        } }, { name: "Player 2", mark: "O", notify: (player) => {
            stateSection.textContent = `Turn of ${player.name}`;
        } }];
game.init(boardContainer, players);
//# sourceMappingURL=script.js.map