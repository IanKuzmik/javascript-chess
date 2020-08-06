
class Knight {

    constructor( name, ctx, color, size, location ) {
        this.name = name;
        this.ctx = ctx;
        this.color = color;
        this.size = size;
        this.location = location; 
        this.draw( location.x, location.y );

    }

    draw( x, y, highlight = false ) {
        // Draw a diamond
        const size = this.size;
        const xCenter = x + size/2;
        const yCenter = y + size/2;
        this.ctx.beginPath();
        this.ctx.moveTo(xCenter, y-size*0.25); // top tip of diamond
        this.ctx.lineTo(x + size, yCenter);    // middle right point of diamond
        this.ctx.lineTo(xCenter, y+size*1.25); // bottom tip of diamond
        this.ctx.lineTo(x, yCenter);           // middle left point of diamond
        this.ctx.closePath();                  // this line is only necessary for highlighting purposes
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        if (this.color == 'white') {                              // only white pieces will be highlighted 
            this.ctx.strokeStyle = highlight ? 'green' : 'white'; // highlight this piece to denote 'inHand' status, or explicity remove highlight
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }

    move( newLocation ) {      
        this.draw( newLocation.x, newLocation.y ); // draw new piece 
        this.location = newLocation                // update location
    }

    /*
    Input: (Object) the location the piece wants to move
    Output: (Bool) whether or not that move is allowed based on how the piece moves
    A Knight has One possible move: 
       Two spaces on one axis with on space on the other
    We can calculate the size of the chess spaces by multiplying the size of the piece by 2
    */
   checkMoveRules( newLocation ) {
        if (Math.abs(this.location.x - newLocation.x) != (this.size*2)*2 && Math.abs(this.location.y - newLocation.y) != (this.size*2)*2 )  {
            return false
        }
        if (Math.abs(this.location.x - newLocation.x) != this.size*2 && Math.abs(this.location.y - newLocation.y) != this.size*2 )  {
            return false
        }
        return true; 
    }
}

export default Knight;