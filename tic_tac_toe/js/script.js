// script.js
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');

const cells = [];
const boardSize = 3;
let currentPlayer = 'X';
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));

function createBoard() {
    boardElement.innerHTML = '';
    cells.length = 0;

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleClick);
            boardElement.appendChild(cell);
            cells.push(cell);
        }
    }
}

function handleClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (board[row][col] || checkWinner()) return;

    board[row][col] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        // Rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonals
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const rowA = Math.floor(a / boardSize);
        const colA = a % boardSize;
        const rowB = Math.floor(b / boardSize);
        const colB = b % boardSize;
        const rowC = Math.floor(c / boardSize);
        const colC = c % boardSize;

        if (
            board[rowA][colA] &&
            board[rowA][colA] === board[rowB][colB] &&
            board[rowA][colA] === board[rowC][colC]
        ) {
            return true;
        }
    }

    return board.flat().every(cell => cell);
}

function restartGame() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
    currentPlayer = 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

restartButton.addEventListener('click', restartGame);

// Initialize the game board
createBoard();
