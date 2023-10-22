document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const squares = board.querySelectorAll('div');
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
          console.log('Game Over');
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

  // Check for a tie
  if (gameState.every(square => square === 'X' || square === 'O')) {
    return true; // It's a tie
  }

  return false; // Game is not over
}
