const can = document.getElementById("can");
const ctx = can.getContext("2d");

const W  = can.width;
const H  = can.height;

const minT = 2000;
const maxT = 5000;

const π = Math.PI;

const circles = [];

for(let i = 0; i < 1000; i++)    
    circles.push(new Circle(
	Random.rec(500, minT),
	Random.rec(500, maxT-minT),
	Random.rec(0, W),
	Random.rec(0, H),
	Random.rec(4, 16),
    ));


(function render(t){
    if( t < maxT ) {
	requestAnimationFrame( render );
	can.width = W;
	ctx.fillStyle   = "rgba(0,255,0,.5)";
	ctx.strokeStyle = "#0f0";
	
	circles.forEach( c => c.draw(ctx,t) );
    }
})(0);
