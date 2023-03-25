const board = document.querySelector('.board');
const message = document.querySelector('.message');

let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameBoard[cellIndex] = currentPlayer;
  cell.classList.add(currentPlayer);
  cell.innerText = currentPlayer;

  if (checkForWin()) {
    message.innerText = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (checkForDraw()) {
    message.innerText = 'It is a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  message.innerText = `Player ${currentPlayer}'s turn`;
}

function checkForWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

function checkForDraw() {
  return gameBoard.every(cell => cell !== '');
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'x';
  gameActive = true;
  message.innerText = `Player ${currentPlayer}'s turn`;
  board.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
  });
}

function startGame() {
  board.innerHTML = '';
  message.innerText = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-cell-index', i);
    cell.classList.add('cell');
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

startGame();

// Restart game button
const restartBtn = document.createElement('button');
restartBtn.innerText = 'Restart Game';
restartBtn.addEventListener('click', restartGame);
message.insertAdjacentElement('afterend', restartBtn);
