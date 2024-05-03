import Board from './board.js';

const data = [ // sample board
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];


let board;
document.addEventListener("DOMContentLoaded", () => {
    board = new Board(data);
    board.addRandomTile();
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
        board.swipeLeft();
        board.mergeLeft();
        board.swipeLeft();
    } else if (e.code == "ArrowRight") {
        board.rotateBoard();
        board.rotateBoard();
        board.swipeLeft();
        board.mergeLeft();
        board.swipeLeft();
        board.rotateBoard();
        board.rotateBoard();
    } else if (e.code === "ArrowUp") {
        board.rotateBoard();
        board.rotateBoard();
        board.rotateBoard();
        board.swipeLeft();
        board.mergeLeft();
        board.swipeLeft();
        board.rotateBoard();
    } else if (e.code === "ArrowDown") {
        board.rotateBoard();
        board.swipeLeft();
        board.mergeLeft();
        board.swipeLeft();
        board.rotateBoard();
        board.rotateBoard();
        board.rotateBoard();
    }
    board.addRandomTile();
}); 