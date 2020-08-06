import Pawn from './pieces/Pawn.js';
import Rook from './pieces/Rook.js';
import Bishop from './pieces/Bishop.js';
import Knight from './pieces/Knight.js';
import Queen from './pieces/Queen.js';
import King from './pieces/King.js';

class GameBoard {

    constructor( canvas, size, color1, color2 ) {
        canvas.width = size;                                     // set width of board
        canvas.height = size;                                    // set width of board
        this.size = size;                                        // save board size; we'll use it to measure just about everything else
        this.color1 = color1;                                    // save color1 for redrawing purposes   
        this.color2 = color2;                                    // save color2 for redrawing purposes 
        this.ctx = canvas.getContext('2d');                      // set up context
        this.spaces = this.setSpaces();                          // get (Object) mapping of chessboard
        this.drawPattern();                                      // draw our checker-pattern chess board
        [this.whitePieces, this.blackPieces] = this.addPieces(); // initialize and draw chess pieces              
        
        // Human Turn
        this.inHand;
        canvas.addEventListener('click', e => {
            // get clicked space
            let clickedSpace = {};
            for ( const space in this.spaces ) {
                let x = this.spaces[space].x + size/16;
                let y = this.spaces[space].y;
                if ( x < e.x && e.x < x + size/8 && y < e.y && e.y < y + size/8 + size/32 ) {
                    clickedSpace = this.spaces[space];
                    break;
                }
            }
            // pick up piece
            if (this.checkSpace(clickedSpace) ) {       
                this.inHand = this.checkSpace(clickedSpace);
            // move piece
            } else if (this.inHand) {
                if ( this.inHand.checkMoveRules(clickedSpace) ) {
                    this.movePiece( this.inHand, clickedSpace );
                    this.inHand = null; 
                } else {
                    console.log('invalid move');
                }
            }
        })
    }


    /*
    Input: (Object) a 'space' object with x,y coordinates
    Output: (Object) a chess piece within that space, or (Null) if space is empty
    */
    checkSpace( clickedSpace ) {
        for ( const piece in this.whitePieces ) {
            if (clickedSpace.x == this.whitePieces[piece].location.x && clickedSpace.y == this.whitePieces[piece].location.y )  {
                if (this.inHand) { 
                    this.inHand.draw( this.inHand.location.x, this.inHand.location.y ); // redraw previous 'inHand' piece w/o a highlight
                 }
                this.inHand = this.whitePieces[piece]
                this.whitePieces[piece].draw( clickedSpace.x, clickedSpace.y, true );   // redraw this piece in place with a highlight
                return this.whitePieces[piece]
            } 
        } 
        return null; 
    }
    
    /* get a mapping of chess space coordinates (A1, B1, C1...) to x,y coordinates on the canvas. also including the name and color of each sqaure */
    setSpaces() {
        const letters = ['A','B','C','D','E','F','G','H'];
        const numbers = ['8','7','6','5','4','3','2','1'];
        let spacesObj = {};
        for (let i=0;i<8;i++) {
            for (let j=0;j<8;j++) {
                spacesObj[letters[i] + numbers[j]] = {
                    name: letters[i] + numbers[j],
                    x: (i* (this.size/8) ) + (this.size/32), 
                    y: (j* (this.size/8) ) + (this.size/32), 
                    color: ((i+j)%2 == 0) ? this.color1 : this.color2
                };
            }
        }
        return spacesObj;
    }

    /* fill our chess board (ctx) in with correctly sized, alternating in color squares */
    drawPattern() {
        for (let space in this.spaces) {
            space = this.spaces[space];
            this.ctx.beginPath();
            this.ctx.fillStyle = space.color
            this.ctx.fillRect( space.x-this.size/32, space.y-this.size/32, this.size/8, this.size/8 );
        }
    }

    /* 
    Input: (Object) chess piece to move (will be inHand). (Object) the location to move it
    Output: (Void) redraw the piece in the new location and 'paint over' it's old location. 
    */
    movePiece( piece, newLocation ) {
        const oldLocation = piece.location;
        this.ctx.fillStyle = oldLocation.color;
        this.ctx.fillRect( oldLocation.x-this.size/32, oldLocation.y-this.size/32, this.size/8, this.size/8 )
        piece.move(newLocation);
    }

     /* Initialize the chess pieces and return an array of them, distinguishing white pieces and black pieces */
     addPieces() {
        return [ 
            [
                new Pawn( 'wPawn1', this.ctx, 'white', this.size/16, this.spaces.A2),
                new Pawn( 'wPawn2', this.ctx, 'white', this.size/16, this.spaces.B2),
                new Pawn( 'wPawn3', this.ctx, 'white', this.size/16, this.spaces.C2),
                new Pawn( 'wPawn4', this.ctx, 'white', this.size/16, this.spaces.D2),
                new Pawn( 'wPawn5', this.ctx, 'white', this.size/16, this.spaces.E2),
                new Pawn( 'wPawn6', this.ctx, 'white', this.size/16, this.spaces.F2),
                new Pawn( 'wPawn7', this.ctx, 'white', this.size/16, this.spaces.G2),
                new Pawn( 'wPawn8', this.ctx, 'white', this.size/16, this.spaces.H2),
                new Rook( 'wRook1', this.ctx, 'white', this.size/16, this.spaces.A1),
                new Rook( 'wRook2', this.ctx, 'white', this.size/16, this.spaces.H1),
                new Bishop( 'wBishop1', this.ctx, 'white', this.size/16, this.spaces.C1),
                new Bishop( 'wBishop2', this.ctx, 'white', this.size/16, this.spaces.F1),
                new Knight( 'wKnight1', this.ctx, 'white', this.size/16, this.spaces.B1),
                new Knight( 'wKnight2', this.ctx, 'white', this.size/16, this.spaces.G1),
                new Queen( 'wQueen', this.ctx, 'white', this.size/16, this.spaces.D1),
                new King( 'wKing', this.ctx, 'white', this.size/16, this.spaces.E1)
            ],
            [
                new Pawn( 'bPawn1', this.ctx, 'black', this.size/16, this.spaces.A7),
                new Pawn( 'bPawn2', this.ctx, 'black', this.size/16, this.spaces.B7),
                new Pawn( 'bPawn3', this.ctx, 'black', this.size/16, this.spaces.C7),
                new Pawn( 'bPawn4', this.ctx, 'black', this.size/16, this.spaces.D7),
                new Pawn( 'bPawn5', this.ctx, 'black', this.size/16, this.spaces.E7),
                new Pawn( 'bPawn6', this.ctx, 'black', this.size/16, this.spaces.F7),
                new Pawn( 'bPawn7', this.ctx, 'black', this.size/16, this.spaces.G7),
                new Pawn( 'bPawn8', this.ctx, 'black', this.size/16, this.spaces.H7),
                new Rook( 'bRook1', this.ctx, 'black', this.size/16, this.spaces.A8),
                new Rook( 'bRook2', this.ctx, 'black', this.size/16, this.spaces.H8),
                new Bishop( 'bBishop1', this.ctx, 'black', this.size/16, this.spaces.C8),
                new Bishop( 'bBishop2', this.ctx, 'black', this.size/16, this.spaces.F8),
                new Knight( 'bKnight1', this.ctx, 'black', this.size/16, this.spaces.B8),
                new Knight( 'bKnight2', this.ctx, 'black', this.size/16, this.spaces.G8),
                new Queen( 'bQueen', this.ctx, 'black', this.size/16, this.spaces.E8),
                new King( 'bKing', this.ctx, 'black', this.size/16, this.spaces.D8)
            ]
        ]
    }
}

export default GameBoard;

