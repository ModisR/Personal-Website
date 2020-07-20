import { scale, minus, len2, norm, inner } from "../Vector.js";

export class RectEntity {
	constructor(x, y, w, h, col) {
		this.x0 = x;
		this.y0 = y;

		this.w = w;
		this.h = h;

		this.x1 = x + w;
		this.y1 = y + h;

		this.corners = [];

		[this.x0, this.x1].forEach(x =>
			[this.y0, this.y1].forEach(y =>
				this.corners.push([x, y])
			)
		);

		this.fill = col;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.x0, this.y0, this.w, this.h);
		ctx.fillStyle = this.fill;
		ctx.fill();
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