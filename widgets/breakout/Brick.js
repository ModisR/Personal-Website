class Brick {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.broken = false;

		const hue = 360 * Math.random();
		this.col = `hsl(${hue},100%,50%)`;
	}

	draw() {
		if (!this.broken) {
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.w, this.h);
			ctx.fillStyle = this.col;
			ctx.fill();

			if (this.collide(pos[0], pos[1])) {
				vel[1] = -vel[1];
				this.broken = true;
				score++;
			}
		}
	}

	collide(x, y) {
		return (
			x > this.x && x < this.x + this.w &&
			y > this.y && y < this.y + this.h
		);
	}
}