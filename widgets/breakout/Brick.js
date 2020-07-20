class Brick {
	static W = 60;
	static H = 15;

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
		this.col = `hsl(${hue},100%,50%)`;
	}

	draw() {
		if (!this.broken) {
			ctx.beginPath();
			ctx.rect(this.x0, this.y0, Brick.W, Brick.H);
			ctx.fillStyle = this.col;
			ctx.fill();

			if (this.broken = this.collide())
				score++;
		}
	}

	collide() {
		if (pos[0] < this.x0 - ballRadius ||
			pos[0] > this.x1 + ballRadius ||
			pos[1] < this.y0 - ballRadius ||
			pos[1] > this.y1 + ballRadius)
			return false;
		else if (pos[0] >= this.x0 && pos[0] <= this.x1) {
			vel[1] = -vel[1];
			return true;
		} else if (pos[1] >= this.y0 && pos[1] <= this.y1) {
			vel[0] = -vel[0];
			return true;
		} else {
			for (let i in this.corners) {
				const corn = this.corners[i];
				const disp = minus(pos, corn);
				const dis2 = len2(disp);

				if (dis2 <= ballRadius * ballRadius) {
					const normal = norm(disp);
					const proj = inner(vel, normal);
					vel = minus(vel, scale(2 * proj, normal));
					return true;
				}
			}
			return false;
		}
	}
}