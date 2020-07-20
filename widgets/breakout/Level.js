import {Brick} from "./Brick.js";

export class Level {
	constructor(rows) {
		this.bricks = [];

		rows.forEach((row, r) => {
			row.forEach((cell, c) => {
				if(cell)
					this.bricks.push(new Brick(
						c * Brick.W,
						r * Brick.H,
						Brick.W, Brick.H
					));
				}
			);
		});
	}
}