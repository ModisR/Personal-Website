function display(){
    cv.height = app.h;

    ct.lineWidth = 2;
    app.terrain.forEach( (t)=>{t.draw();});
    gui.draw();
    ct.stroke();

    ct.fillStyle = "#a00";
    ct.font = "16px sans-serif";
    ct.fillText( app.fps+"fps", 16, 32);
}

function idle(t0){ return (t1)=>{
    requestAnimationFrame( idle( t1 ));
    
    var fps = 1000/(t1-t0);

    if( t1 % 1000 < t0 % 1000 ) app.fps = Math.round(fps); // Update FPS counter once per sec

    gui.pos.x += gui.vel.x / fps;
    gui.pos.y += gui.vel.y / fps;
    
    //gui.vel.x += gui.acc.x / fps;
    gui.vel.y += gui.acc.y / fps;

    
    
    if( gui.pos.x < gui.r ){
	gui.pos.x = gui.r;
	gui.vel.x = 0;
    }
    else if( gui.pos.x > gui.max.x ){
	gui.pos.x = gui.max.x;
	gui.vel.x = 0;
    }
    
    if( gui.pos.y > gui.max.y ){
	gui.pos.y = gui.max.y;
	gui.vel.y = 0;
	gui.acc.y = 0;
	if( gui.up ) gui.vel.y = -gui.jmp;
    }
    else{
	gui.acc.y = gui.up? app.g/4: app.g;
    }
    
    display();
};}


function keydown(e){
    switch( e.which )
    {
	case 37: gui.vel.x = -gui.spd; break;
	case 38: gui.up = true; break;
	case 39: gui.vel.x =  gui.spd;
    }
}

function keyup(e){
    switch( e.which )
    {
	case 37: gui.vel.x = 0; break;
	case 38: gui.up = false; break;
	case 39: gui.vel.x = 0;
    }
}
