class BoardSpot {
    constructor(rowVal = 0, colVal = 0) {
        this.row = rowVal;
        this.col = colVal;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    equals(other) {
        if (other instanceof BoardSpot) {
            const o = other;
            return this.row === o.row && this.col === o.col;
        } else {
            return false;
        }
    }
}

class Board {
    constructor(data) {
        this.openSpaces = [];
        this.gameBoard = this.board(data);
        this.updateOpenSpaces();
        this.score = 0;
    }

    board(data) {
        const gameBoard = [];
        for (let row = 0; row < data.length; row++) {
            gameBoard[row] = [];
            for (let col = 0; col < data[row].length; col++) {
                gameBoard[row][col] = data[row][col];
            }
        }
        return gameBoard;
    }

    updateOpenSpaces() {
        this.openSpaces = [];
        for (let row = 0; row < this.gameBoard.length; row++) {
            for (let col = 0; col < this.gameBoard[row].length; col++) {
                if (this.gameBoard[row][col] === 0) {
                    this.openSpaces.push(new BoardSpot(row, col));
                }
            }
        }
    }

    addRandomTile() {
        if (this.openSpaces.length === 0) {
            console.log('No open spaces available. Game over!');
            console.log('Refresh the page to start again.');
            return;
        }
        const randomIndex = Math.floor(Math.random() * this.openSpaces.length);
        const randomSpot = this.openSpaces[randomIndex];
        const tileValue = Math.random() < 0.1 ? 4 : 2;
        this.gameBoard[randomSpot.row][randomSpot.col] = tileValue;
        this.updateOpenSpaces();
        this.print();
        // this.printOpenSpaces();
    }

    swipeLeft() {
        for (let i = 0; i < this.gameBoard.length; i++) {
            let currentColumn = 0;
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                if (this.gameBoard[i][j] !== 0) {
                    if (j !== currentColumn) {
                        this.gameBoard[i][currentColumn] = this.gameBoard[i][j];
                        this.gameBoard[i][j] = 0;
                    }
                    currentColumn++;
                }
            }
        }
    }

    print() {
        console.log('---BOARD START---')
        for (let row = 0; row < this.gameBoard.length; row++) {
            let rowString = "";
            for (let col = 0; col < this.gameBoard[row].length; col++) {
                rowString += this.gameBoard[row][col] === 0 ? "0" : this.gameBoard[row][col];
                rowString += " ".repeat(5 - String(this.gameBoard[row][col]).length);
            }
            console.log(rowString, row);
        }
        console.log('---BOARD END---')
    }

    printOpenSpaces() {
        for (let r = 0; r < this.gameBoard.length; r++) {
            let rowString = "";
            for (let c = 0; c < this.gameBoard[r].length; c++) {
                let g = this.gameBoard[r][c];
                let openSpaceFound = false;
                for (const bs of this.openSpaces) {
                    if (r === bs.getRow() && c === bs.getCol()) {
                        g = "**";
                        openSpaceFound = true;
                        break;
                    }
                }
                rowString += (g === 0) ? "-" : g;
                rowString += " ".repeat(5 - String(g).length);
            }
            console.log(rowString, r);
        }
    }

    mergeLeft() {
        let scoreIncrease = 0;
        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[i].length - 1; j++) {
                if (this.gameBoard[i][j] === this.gameBoard[i][j + 1] && this.gameBoard[i][j] !== 0) {
                    this.gameBoard[i][j] *= 2;
                    this.gameBoard[i][j + 1] = 0;
                    scoreIncrease += this.gameBoard[i][j];
                }
            }
        }
        this.score += scoreIncrease;
        console.log("Score: ", this.score);
    }

    transpose() {
        const transGameBoard = [];
        for (let i = 0; i < this.gameBoard.length; i++) {
            transGameBoard[i] = [];
            for (let j = 0; j < this.gameBoard.length; j++) {
                transGameBoard[i][j] = this.gameBoard[j][i];
            }
        }

        for (let x = 0; x < this.gameBoard.length; x++) {
            for (let y = 0; y < this.gameBoard.length; y++) {
                this.gameBoard[x][y] = transGameBoard[x][y];
            }
        }
    }

    flipRows() {
        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < Math.floor(this.gameBoard[0].length / 2); j++) {
                let temp = this.gameBoard[i][j];
                this.gameBoard[i][j] = this.gameBoard[i][this.gameBoard[0].length - 1 - j];
                this.gameBoard[i][this.gameBoard[0].length - 1 - j] = temp;
            }
        }
    }

    rotateBoard() {
        this.transpose();
        this.flipRows();
    }
}

export default Board;