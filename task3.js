const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const resetButton = document.getElementById('reset-button');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[clickedCellIndex] !== "" || !gameActive) {
        return; // Ignore click if cell already occupied or game is not active
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickSound.play(); // Play click sound
    checkResult();
}

// Check for winning conditions or draw
function checkResult() {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === "" || board[b] === "" || board[c] === "") {
            continue; // Ignore empty cells
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        updateScore();
        winSound.play(); // Play win sound
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Update scores
function updateScore() {
    scores[currentPlayer]++;
    scoreXDisplay.textContent = scores.X;
    scoreODisplay.textContent = scores.O;
}

// Restart the game
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O');
    });
}

// Reset scores
function resetScores() {
    scores = { X: 0, O: 0 };
    scoreXDisplay.textContent = scores.X;
    scoreODisplay.textContent = scores.O;
    restartGame();
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
resetButton.addEventListener('click', resetScores);

// Initialize the status display
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
