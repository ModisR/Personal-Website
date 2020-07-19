const can = document.getElementById("can");
const ctx = can.getContext("2d");

const W  = can.width;
const H  = can.height;
const t1 = 2000; // animation duration in millisecs

const maxSize = 28;
const minSize = 4

const skwarez = [];

for(let i = 0; i < 1000; i++) {
    const size = Random.rec( minSize, maxSize);
    const y0   = Random.rec( 0, H);

    const r1 = (Random.tri(minSize) + size) / (minSize + maxSize)
    const x1 = r1 * W;
    const y1 = x1 * y0 / W;
    
    skwarez.push(new Skware(
	size,
	Math.PI * Random.rec( -4, 4),
	Math.PI * Random.rec( -4, 4),
	V(W, y0),
	V(x1, y1)
    ));
}


(function render(t){
    if( t < t1 ) {
	requestAnimationFrame( render );

	const tProg =  t/t1;               // time progress 0-1
	const dProg = 1 - Math.pow(1-tProg, 3)  // distance progress
	
	can.width = W;
	ctx.fillStyle   = "rgba(0,255,0,"+dProg*2/3+")";
	ctx.strokeStyle = "#0f0";
	
	skwarez.forEach( s => s.draw(dProg) );
    }
})(0);
