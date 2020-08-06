
class Pawn {

    constructor( name, ctx, color, size, location ) {
        this.name = name;
        this.ctx = ctx;
        this.color = color;
        this.size = size;
        this.firstMove = true;
        this.location = location; 
        this.draw( location.x, location.y );
    }

    /* Draw a triangle */
    draw ( x, y, highlight = false ) {
        const size = this.size;
        this.ctx.beginPath();
        this.ctx.moveTo(x + size/2, y);                          // tip of triangle
        this.ctx.lineTo(x, y+size);                              // lower left point of triangle
        this.ctx.lineTo(x+size, y+size);                         // lower right point of triangle
        this.ctx.closePath();                                    // this line is only necessary for highlighting purposes
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        if (this.color == 'white') {                              // only white pieces will be highlighted 
            this.ctx.strokeStyle = highlight ? 'green' : 'white'; // highlight this piece to denote 'inHand' status, or explicity remove highlight
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }

    }
    
    /* move this piece to a new location */
    move( newLocation ) {      
        this.draw( newLocation.x, newLocation.y ); // draw new piece 
        this.location = newLocation                // update location
        this.firstMove = false;                    // update firstMove
    }

    /*
    Input: (Object) the location the piece wants to move
    Output: (Bool) whether or not that move is allowed based on how the piece moves
    A Pawn has three possible moves: 
        One space forward (default) 
        Two spaces forward (on first move)
        One space diagonally (attack)
    We can calculate the size of the chess spaces by multiplying the size of the piece by 2
    */
    checkMoveRules( newLocation ) {
        if (this.location.y <= newLocation.y ) {
            return false; // Can't move backwards or laterally
        }
        if ( this.firstMove && (this.location.y - newLocation.y) > (this.size*2) * 2 ) {
            return false; // Can't move more than two forward on first move
        }
        if ( !this.firstMove && (this.location.y - newLocation.y) > (this.size*2) ) {
            return false; // Can't move more than one forward normally
        }
        if ( Math.abs(this.location.x - newLocation.x) > this.size*2 ) {
            return; // Can't move more than one space to the left and right (other conditions ensure pawn will move forward)
        }
        return true; 
    }

}

export default Pawn;