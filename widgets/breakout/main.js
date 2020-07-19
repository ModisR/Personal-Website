const can = document.getElementById("can");
const ctx = can.getContext("2d");
const [W, H] = [480, 320]
ctx.scale(9 / 4, 9 / 4);

const ballRadius = 10;
var pos = vec(W / 2, H - 30);
var vel = vec(200, -200);

var [lPress, rPress] = [false, false];

const paddleH = 10;
const paddleW = 75;
var paddleX = (W - paddleW) / 2;
const paddleSpd = 200;

const brickRows = 3;
const brickCols = 5;
const brickW = 75;
const brickH = 20;
const brickGap = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (var c = 0; c < brickCols; c++)
	for (var r = 0; r < brickRows; r++)
		bricks.push(new Brick(
			brickOffsetLeft + c * (brickW + brickGap),
			brickOffsetTop + r * (brickH + brickGap),
			brickW, brickH
		));

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function drawBricks() {
	bricks.forEach(brick => brick.draw());
}

var score = 0;

function drawScore() {
	if (score == bricks.length) {
		alert("YOU WIN, CONGRATULATIONS!");
		document.location.reload();
	} else {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: " + score, 8, 20);
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
			}
			else if(pos[1] >= H - ballRadius){
				alert("GAME OVER");
				document.location.reload();
			}

		const dt = (t1 - t0) / 1000;
		const dp = scale(dt, vel);

		pos = add(pos, dp);
		drawBall();

		if (lPress)
			paddleX -= dt * paddleSpd;
		else if (rPress)
			paddleX += dt * paddleSpd;

		drawPaddle();
		drawBricks();
		drawScore();
	}
}

requestAnimationFrame(draw(0));