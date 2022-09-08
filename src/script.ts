import {game, Player, GameStatuses} from "./game.js";

const boardContainer = document.querySelector(".main__board-container") as HTMLElement;
const stateContainer = document.querySelector(".main__state") as HTMLElement;
const playerButton = document.querySelector(".main__player") as HTMLElement;
const aiButton = document.querySelector(".main__ai") as HTMLElement;


playerButton.addEventListener("click", () => {
	game.setPlayers([
		{name: "Player 1", mark: "X"},
		{name: "Player 2", mark: "O"}
	]);
	game.start();
});

aiButton.addEventListener("click", () => {
	game.setPlayers([
		{name: "Player 1", mark: "X"},
		{name: "AI", mark: "O", notify: () => {
			const cells = Array.from(document.querySelectorAll(".cell")).filter(cell => !cell.textContent);
			if (cells.length) {
				const el = cells[Math.floor((Math.random()*cells.length))] as HTMLElement;
				el.click();
			}
		}}
	]);
	game.start();
});


// document.getElementById('elementID').click();

game.init(boardContainer, stateContainer);