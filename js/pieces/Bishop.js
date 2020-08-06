
class Bishop {

    constructor( name, ctx, color, size, location ) {
        this.name = name;
        this.ctx = ctx;
        this.color = color;
        this.size = size;
        this.location = location; 
        this.draw( location.x, location.y );
    }

    draw( x, y, highlight = false ) {
        const size = this.size;
        // draw a circle
        this.ctx.beginPath();
        this.ctx.arc(x + size/2, y + size/2, size * 0.6, 0, 2 * Math.PI ); // xCenter, yCenter, radius, startAngle, endAngle
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
    A Bishop has One possible move: 
       Diagonally any amount of spaces
    */
   checkMoveRules( newLocation ) {
        if (Math.abs(this.location.x - newLocation.x) != Math.abs(this.location.y - newLocation.y)) {
            return false
        }
        return true; 
    }

}

export default Bishop;