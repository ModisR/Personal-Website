import { Level } from "./Level.js";
import { vec, scale, plus, minus, len2, norm, inner } from "../Vector.js";

const can = document.getElementById("can");
const ctx = can.getContext("2d");
const [W, H] = [640, 360]
ctx.scale(2, 2);

const ballRadius = 8;
var pos = vec(W / 2, H - 30);
var vel = vec(200, -200);

var [lPress, rPress] = [false, false];

const paddleH = 10;
const paddleW = 75;
var paddleX = (W - paddleW) / 2;
const paddleSpd = 300;

const levels = [
	[
		[true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true]
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

function drawBall() {
	ctx.beginPath();
	ctx.arc(...pos, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#09D";
	ctx.fill();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, H - paddleH, paddleW, paddleH);
	ctx.fillStyle = "#09D";
	ctx.fill();
}

var score = 0;

function drawScore() {
	if (score == levels[0].bricks.length) {
		alert("YOU WIN, CONGRATULATIONS!");
		location.reload();
	} else {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: " + score, 8, 20);
	}
}

function checkCollision(brick) {
	switch (true) {
		case pos[0] < brick.x0 - ballRadius || pos[0] > brick.x1 + ballRadius ||
			pos[1] < brick.y0 - ballRadius || pos[1] > brick.y1 + ballRadius:
			return false;
		case pos[0] >= brick.x0 && pos[0] <= brick.x1:
			vel[1] = -vel[1];
			return true;
		case pos[1] >= brick.y0 && pos[1] <= brick.y1:
			vel[0] = -vel[0];
			return true;
		default:
			return brick.corners.some(cor => {
				const disp = minus(pos, cor);
				const dis2 = len2(disp);

				if (dis2 <= ballRadius * ballRadius) {
					const normal = norm(disp);
					const proj = inner(vel, normal);
					vel = minus(vel, scale(2 * proj, normal));
					return true;
				}
				return false;
			});
	}
}

function draw(t0) {
	return (t1) => {
		requestAnimationFrame(draw(t1));
		ctx.clearRect(0, 0, W, H);

		if (pos[0] >= W - ballRadius || pos[0] <= ballRadius)
			vel[0] = -vel[0];

		if (pos[1] <= ballRadius) {
			vel[1] = -vel[1];
		} else if (pos[1] >= H - ballRadius - paddleH)
			if (pos[0] > paddleX && pos[0] < paddleX + paddleW) {
				vel[1] = -vel[1];
				vel = scale(1.02, vel);
			}
			else if (pos[1] >= H - ballRadius) {
				alert("GAME OVER");
				location.reload();
			}

		const dt = (t1 - t0) / 1000;
		const dp = scale(dt, vel);

		pos = plus(pos, dp);
		drawBall();

		if (lPress && paddleX > 0)
			paddleX -= dt * paddleSpd;
		else if (rPress && paddleX <= W - paddleW)
			paddleX += dt * paddleSpd;

		drawPaddle();
		levels[0].bricks.forEach(brick => {
			if (!brick.broken){
				brick.draw(ctx);
				if(brick.broken = checkCollision(brick))
					score++;
			}
		});
		drawScore();
	}
}

requestAnimationFrame(draw(0));