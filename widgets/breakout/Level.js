import {Brick} from "./Brick.js";

export class Level {
	static brickGap = 10;

	constructor(rows) {
		this.bricks = [];

		rows.forEach((row, r) => {
			row.forEach((cell, c) => {
				if(cell)
					this.bricks.push(new Brick(
						Level.brickGap + c * (Brick.W + 2*Level.brickGap),
						Level.brickGap + r * (Brick.H + 2*Level.brickGap),
						Brick.W, Brick.H
					));
				}
			);
		});
	}
}