export class Brick {
	static W = 80;
	static H = 20;

	constructor(x, y) {
		this.x0 = x;
		this.y0 = y;
		this.x1 = x + Brick.W;
		this.y1 = y + Brick.H;

		this.corners = [];

		[this.x0, this.x1].forEach(x =>
			[this.y0, this.y1].forEach(y =>
				this.corners.push([x, y])
			)
		);

		this.broken = false;

		const hue = 360 * Math.random();
		this.fill   = `hsl(${hue},100%,50%)`;
		this.stroke = `hsl(${hue},100%,25%)`;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.x0, this.y0, Brick.W, Brick.H);
		ctx.fillStyle = this.fill;
		ctx.fill();
		ctx.strokeStyle = this.stroke;
		ctx.stroke();
	}
}