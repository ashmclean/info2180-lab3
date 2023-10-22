document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const squares = board.querySelectorAll('div');
  const status = document.getElementById('status');

  let currentPlayer = 'X';
  var gameState = ['', '', '', '', '', '', '', '', ''];

  squares.forEach(function(square, index) {
    square.classList.add('square');

    square.addEventListener('click', function() {
      if (!square.classList.contains('X') && !square.classList.contains('O')) {
        square.classList.add(currentPlayer);
        square.textContent = currentPlayer;
        gameState[index] = currentPlayer;

        if (isGameOver(gameState)) {
          status.classList.add('you-won');
          status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
          console.log('Game Over');
          newGame();
        }

        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
      }
    });

    square.addEventListener('mouseover',function(){
      square.classList.add('hover');
      
    });
    square.addEventListener('mouseout', function(){
      square.classList.remove('hover');
    });

  });
});

function newGame(){
  const newGamebtn = document.querySelector('.btn');
  newGamebtn.addEventListener("click", function(){ 
    resetGame();
  });
}

function resetGame(){
  const squares = board.querySelectorAll('div');

  squares.forEach(function(square) {
    square.classList.remove('X', 'O');
    square.textContent = '';
  });

  gameState = ['', '', '', '', '', '', '', '', ''];

  const status = document.getElementById('status');
  status.textContent = "Move your mouse over a square and click to play an X or an O.";
  status.classList.remove("you-won");

  currentPlayer = 'X';

}

function isGameOver(gameState) {
  // Check for a win
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      return true; // A player has won
    }
  }

  return false; // Game is not over
}