var tau = 2*Math.PI;

var app = {
    w: 1280,
    h: 720,
    fps: 0,
    g: 4000,
    terrain: [
	new Terrain(   20,   4, 1260,  12),
	new Terrain(    4,  20,   12, 700),
	new Terrain(   20, 708, 1260, 716),
	new Terrain( 1268,  20, 1276, 700)
    ]
};
var gui = {
    pos: {
	x: app.w/2,
	y: app.h/2
    },
    vel: {x: 0,	y: 0},
    acc: {x: 0,	y: 0},
    spd: 500,
    jmp: 1000,
    up: false,
    r: 10,
    draw: ()=>{ ct.arc( gui.pos.x, gui.pos.y, gui.r, 0, tau);},
    collidesWith: (terrain)=>{}
};

gui.max = {
    x: app.w - gui.r,
    y: app.h - gui.r
}

var cv = $("canvas")[0];
var ct = cv.getContext("2d");

cv.width = app.w;

idle(0)(0); // Initiate requestAnimationFrame

// Input Bindings
[
    "keydown",
    "keyup"
].forEach( (b)=>{
    $(document.body)[b]( (e)=>{
	e.preventDefault();
	window[b](e);
    });
});
