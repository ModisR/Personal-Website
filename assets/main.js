const tau = 2*Math.PI

const w = 1280;
const h = 720;

const c = document.getElementById('canvas');

c.width = w;
c.height = h;

const ctx = c.getContext('2d');

const iNum  = 15;    // Number of iterations
const aTime = 15000; // Millisecs for a complete loop

// Fixed pivot point of the curve

const size = w/3;
const x0 = (w - size) / 2;
const y0 = h/2;

(function render(t) {
    requestAnimationFrame(render);
    
    c.width = w;

    const aProg = iNum * (1 - Math.cos( tau * t / aTime)) / 2; // animation progress
    const iCurr = aProg | 0;                                   // current iteration
    const iProg = aProg - iCurr;                               // iteration progress
    
    const sCurr = Math.pow( Math.SQRT1_2, iProg ) * size; // current size
    
    const angle0 = iProg * Math.PI / 4;
    const x1 = x0 + sCurr * Math.cos( angle0 );
    const y1 = y0 - sCurr * Math.sin( angle0 );
    
    const angle1 = 3 * angle0;
    const x2 = x1 - sCurr * Math.cos( angle1 );
    const y2 = y1 + sCurr * Math.sin( angle1 );

    ctx.dragonCurve( iCurr, x0, y0, x1, y1);
    ctx.dragonCurve( iCurr, x2, y2, x1, y1);
    
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    
})(0);
