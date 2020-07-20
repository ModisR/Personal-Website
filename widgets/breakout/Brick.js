import { RectEntity } from "./RectEntity.js"


export class Brick extends RectEntity {
	static W = 80;
	static H = 20;

	constructor(x, y) {
		super(x, y, Brick.W, Brick.H);

		this.broken = false;
	}
}