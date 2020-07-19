const can = document.getElementById("can");
const ctx = can.getContext("2d");


const ballRadius = 10;
var pos = vec(can.width / 2, can.height - 30);
var vel = vec(200, -200);

function drawBall() {
	ctx.beginPath();
	ctx.arc(...pos, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#09D";
	ctx.fill();
}

const paddleH = 10;
const paddleW = 75;
var paddleX = (can.width - paddleW) / 2;
var paddleSpd = 200;

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, can.height - paddleH, paddleW, paddleH);
	ctx.fillStyle = "#09D";
	ctx.fill();
}

var [lPress, rPress] = [false, false];

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

var brickRows = 3;
var brickCols = 5;
var brickW = 75;
var brickH = 20;
var brickGap = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c = 0; c < brickCols; c++)
	for (var r = 0; r < brickRows; r++)
		bricks.push(new Brick(
			brickOffsetLeft + c * (brickW + brickGap),
			brickOffsetTop + r * (brickH + brickGap),
			brickW, brickH
		));

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
		raf = requestAnimationFrame(draw(t1));
		ctx.clearRect(0, 0, can.width, can.height);

		if (pos[0] >= can.width - ballRadius || pos[0] <= ballRadius)
			vel[0] = -vel[0];

		if (pos[1] <= ballRadius) {
			vel[1] = -vel[1];
		} else if (pos[1] > can.height - ballRadius)
			if (pos[0] > paddleX && pos[0] < paddleX + paddleW) {
				vel[1] = -vel[1];
			}
			else {
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

var raf = requestAnimationFrame(draw(0));