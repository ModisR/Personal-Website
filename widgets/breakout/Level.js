class Level {
	static brickRows = 3;
	static brickCols = 5;
	static brickGap = 10;
	static brickOffsetTop = 30;
	static brickOffsetLeft = 30;

	constructor(rows) {
		this.bricks = [];

		rows.forEach((row, r) => {
			row.forEach((cell, c) => {
				if(cell)
					this.bricks.push(new Brick(
						Level.brickOffsetLeft + c * (Brick.W + Level.brickGap),
						Level.brickOffsetTop + r * (Brick.H + Level.brickGap),
						Brick.W, Brick.H
					));
				}
			);
		});
	}

	draw() {
		this.bricks.forEach(brick => brick.draw());
	}
}