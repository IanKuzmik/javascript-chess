class Queen {

    constructor(name, ctx, color, size, location) {
        this.name = name;
        this.ctx = ctx;
        this.color = color;
        this.size = size;
        this.location = location;
        this.draw( location.x, location.y );

    }

    draw( x, y, highlight = false) {
        const size = this.size;
        this.ctx.beginPath();
        this.ctx.moveTo(x + size * 0.5, y - size * 0.25); 
        this.ctx.lineTo(x + size * 0.75, y + size * 0.75 )                                   
        this.ctx.lineTo(x + size * 1.3, y + size * 0.5 )  
        this.ctx.lineTo(x + size * 0.75, y + size * 0.25 )  
        this.ctx.lineTo(x + size * 0.5, y + size * 1.25)  
        this.ctx.lineTo(x + size * 0.25, y + size * 0.25) 
        this.ctx.lineTo(x - size * 0.3, y + size * 0.5) 
        this.ctx.lineTo(x + size * 0.25, y + size * 0.75)       
        this.ctx.closePath();                                     // this line is only necessary for highlighting purposes
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
    A Queen has Three possible move: 
        Diagonally any amount of spaces
        Horizontally any amount of spaces
        Vertically any amount of spaces
    */
   checkMoveRules( newLocation ) {
        if (Math.abs(this.location.x - newLocation.x) == Math.abs(this.location.y - newLocation.y)) {
            return true
        }
        if (this.location.y == newLocation.y || this.location.x == newLocation.x ) {
            return true;
        }
        return false;
    }
}

export default Queen;