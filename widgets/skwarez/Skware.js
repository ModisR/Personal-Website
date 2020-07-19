function Skware(s, d0, d1, p0, p1){
    this.size = s;
    this.d_2 = s * Math.SQRT1_2; //half the diagonal
    this.s_2  = s/2;
    
    this.dir0 = d0;
    this.dir1 = d1;
    
    this.pos0 = p0; // initial
    this.pos1 = p1; // final
}
Skware.prototype.draw = function(dProg) {
    let pos =
        this.pos0.scale(1-dProg).add(
            this.pos1.scale(dProg) );
    let dir = dProg * this.dir1 + (1-dProg) * this.dir0;

    pos = pos.add(Vector.pol(this.d_2, dir));
    dir += Math.PI * 3/4;

    ctx.beginPath();
    ctx.moveTo(...pos.v);
    
    for(let i = 0; i < 4; i++) {
        pos = pos.add( Vector.pol(this.size, dir) );
        ctx.lineTo( ...pos.v);
        dir += Math.PI / 2;
    }

    ctx.stroke();
    ctx.fill();
};
