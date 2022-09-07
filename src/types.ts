export type Cell = {
	value: string
}

export type GameBoard = {
	cells: Cell[]
}


export type Player = {
	name: string,
	mark: string,
}

export type Game = {
	setGameBoard: BoardSetter,
	getGameBoard: BoardGetter,
	setPlayers: PlayersSetter,
	getPlayers: PlayersGetter
}

export type Setter<T> = (value: T) => void;
export type Getter<T> = () => T;

export type BoardSetter = Setter<GameBoard>;
export type BoardGetter = Getter<GameBoard>;
export type PlayersSetter = Setter<Player[]>;
export type PlayersGetter = Getter<Player[]>;