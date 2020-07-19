CanvasRenderingContext2D.prototype.dragonCurve = function( i, x0, y0, x1, y1 )
{
    if( i < 1 )
    {
        this.moveTo( x0, y0 );
        this.lineTo( x1, y1 );
    }
    else
    {
        var x2 = (x0+x1+y1-y0)/2;
        var y2 = (y0+y1+x0-x1)/2;
        
        this.dragonCurve( i-1, x0, y0, x2, y2);
        this.dragonCurve( i-1, x1, y1, x2, y2);
    }
}
