
class Rook {

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
        this.ctx.beginPath();                                    // I don't use fillRect here, becasue it causes unexplainable bugs w/ the highlighting functionality. go figure 
        this.ctx.moveTo( x, y); 
        this.ctx.lineTo( x + size, y)
        this.ctx.lineTo( x + size, y + size)
        this.ctx.lineTo( x, y + size)
        this.ctx.closePath(); 
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
    A Rook has Two possible moves: 
        Horizontally any amount of spaces
        Vertically any amount of spaces
    */
   checkMoveRules( newLocation ) {
        if (this.location.y != newLocation.y && this.location.x != newLocation.x ) {
            return false;
        }
        return true; 
    }
}

export default Rook;