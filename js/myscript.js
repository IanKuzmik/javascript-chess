import GameBoard from './GameBoard.js';

const canvas = document.querySelector('canvas');
const BOARD_SIZE = 600;

let board = new GameBoard(canvas, BOARD_SIZE, '#CC9900', '#663300' )