function Terrain( x0, y0, x1, y1){
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    
    var me = this;
    
    this.draw = ()=>{ ct.strokeRect( me.x0, me.y0, me.x1-me.x0, me.y1-me.y0);}
}
