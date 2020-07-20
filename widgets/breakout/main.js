import { vec, scale, plus } from "../Vector.js";
import { RectEntity } from "./RectEntity.js";
import { Level } from "./Level.js";

const can = document.getElementById("can");
const ctx = can.getContext("2d");
const [W, H] = [640, 360]
ctx.scale(2, 2);

const ball = {
	rad: 8,
	pos: vec(W / 2, H - 30),
	vel: vec(200, -200),
	draw: function () {
		ctx.beginPath();
		ctx.arc(...this.pos, this.rad, 0, Math.PI * 2);
		ctx.fillStyle = "#09D";
		ctx.fill();
	}
}

var [lPress, rPress] = [false, false];

const paddleW = 75;
const paddleH = 10;
var paddleSpd = 280;
function newPaddle(x){
	return new RectEntity(x, H - paddleH, paddleW, paddleH, "#f70")
}
var paddle = newPaddle((W - paddleW) / 2);

const levels = [
	[
		[false, false, false, true, true, false, false, false],
		[false, false, false, true, true, false, false, false],
		[true, false, true, true, true, true, false, true],
		[true, false, true, true, true, true, false, true],
		[true, false, true, true, true, true, false, true],
		[true, false, true, true, true, true, false, true],
		[true, false, true, true, true, true, false, true],
		[true, false, true, true, true, true, false, true]
	]
].map(level => new Level(level, W, H));

function keyDownHandler(e) {
	switch (e.code) {
		case "ArrowLeft": lPress = true; break;
		case "ArrowRight": rPress = true;
	}
}

function keyUpHandler(e) {
	switch (e.code) {
		case "ArrowLeft": lPress = false; break;
		case "ArrowRight": rPress = false;
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var score = 0;

function drawScore(dt) {
	if (score == levels[0].bricks.length) {
		alert("YOU WIN, CONGRATULATIONS!");
		location.reload();
	} else {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: " + score, 8, 20);
		ctx.fillText(`${1 / dt | 0} FPS`, 560, 20);
	}
}

function draw(t0) {
	return (t1) => {
		requestAnimationFrame(draw(t1));
		ctx.clearRect(0, 0, W, H);

		if (ball.pos[0] >= W - ball.rad || ball.pos[0] <= ball.rad)
			ball.vel[0] = -ball.vel[0];

		if (ball.pos[1] <= ball.rad) {
			ball.vel[1] = -ball.vel[1];
		} else if (ball.pos[1] >= H - ball.rad - paddleH)
			if (paddle.collides(ball)) {
				ball.vel = scale(1.01, ball.vel);
				paddleSpd *= 1.01;
			}
			else if (ball.pos[1] >= H - ball.rad) {
				alert("GAME OVER");
				location.reload();
			}

		const dt = (t1 - t0) / 1000;
		const dp = scale(dt, ball.vel);

		ball.pos = plus(ball.pos, dp);
		ball.draw();

		if (lPress && paddle.x0 > 0)
			paddle = newPaddle(paddle.x0 - dt*paddleSpd);
		else if (rPress && paddle.x0 <= W - paddleW)
			paddle = newPaddle(paddle.x0 + dt*paddleSpd);

		paddle.draw(ctx);
		if (levels[0].collides(ball, ctx))
			score++;
		drawScore(dt);
	}
}

requestAnimationFrame(draw(0));