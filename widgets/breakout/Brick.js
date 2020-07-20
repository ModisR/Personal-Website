import { scale, minus, len2, norm, inner } from "../Vector.js";

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

	collides(ball){
		switch (true) {
			case ball.pos[0] < this.x0 - ball.rad || ball.pos[0] > this.x1 + ball.rad ||
				ball.pos[1] < this.y0 - ball.rad || ball.pos[1] > this.y1 + ball.rad:
				return false;
			case ball.pos[0] >= this.x0 && ball.pos[0] <= this.x1:
				ball.vel[1] = -ball.vel[1];
				return true;
			case ball.pos[1] >= this.y0 && ball.pos[1] <= this.y1:
				ball.vel[0] = -ball.vel[0];
				return true;
			default:
				return this.corners.some(cor => {
					const disp = minus(ball.pos, cor);
					const dis2 = len2(disp);

					if (dis2 <= ball.rad * ball.rad) {
						const normal = norm(disp);
						const proj = inner(ball.vel, normal);
						ball.vel = minus(ball.vel, scale(2 * proj, normal));
						return true;
					}
					return false;
				});
			}
	}
}