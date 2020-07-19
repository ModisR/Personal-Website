function Circle(st, lt, x, y, r){
    this.startTime = st;
    this.lifeTime = lt;
    this.endTime = st+lt;
    
    this.x = x;
    this.y = y;
    this.r = r;
}
Circle.prototype.draw = function(ctx, t) {
    if(t > this.startTime){
	ctx.beginPath();
	let r = this.r;
	
	if(t < this.endTime){
	    const p = (t-this.startTime) / this.lifeTime;
	    const q =  p*(3-2*p);

	    r = q * this.r;
	}

	ctx.arc(this.x, this.y, r, 0, 2*π);
	ctx.stroke();
	ctx.fill();
    }
};
