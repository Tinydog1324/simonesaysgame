 document.addEventListener('DOMContentLoaded', function() {
      // Game constants
      const gameButtons = document.querySelectorAll('.game-button');
      const startButton = document.getElementById('start-btn');
      const resetButton = document.getElementById('reset-btn');
      const scoreElement = document.getElementById('score');
      const sequence = [];
      let playerTurn = false;
      let score = 0;
      let sequenceIndex = 0;
      
      // Function to generate a random button from gameButtons
      function getRandomButton() {
        const randomIndex = Math.floor(Math.random() * gameButtons.length);
        return gameButtons[randomIndex];
      }
      
      // Function to play the current sequence
      function playSequence() {
        playerTurn = false;
        let i = 0;
        const interval = setInterval(function() {
          const button = sequence[i];
          highlightButton(button);
          i++;
          if (i >= sequence.length) {
            clearInterval(interval);
            playerTurn = true;
          }
        }, 1000);
      }
      
      // Function to highlight a button by adding the 'active' class
      function highlightButton(button) {
        button.classList.add('active');
        setTimeout(function() {
          button.classList.remove('active');
        }, 500);
      }
      
      // Function to handle player's turn and check the input
      function handlePlayerTurn(button) {
        if (!playerTurn) return;
        
        highlightButton(button);
        if (button === sequence[sequenceIndex]) {
          sequenceIndex++;
          if (sequenceIndex >= sequence.length) {
            playerTurn = false;
            score++;
            scoreElement.textContent = score;
            setTimeout(function() {
              nextTurn();
            }, 1000);
          }
        } else {
          endGame();
        }
      }
      
      // Function to start the game
      function startGame() {
        sequence.length = 0;
        score = 0;
        scoreElement.textContent = score;
        nextTurn();
      }
      
      // Function to end the game
      function endGame() {
        alert('Game over! Your score: ' + score);
        playerTurn = false;
        sequenceIndex = 0;
      }
      
      // Function to start the next turn
      function nextTurn() {
        playerTurn = false;
        sequenceIndex = 0;
        const nextButton = getRandomButton();
        sequence.push(nextButton);
        playSequence();
      }
      
      // Add click event listeners to game buttons
      gameButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          handlePlayerTurn(button);
        });
      });
      
      // Add click event listeners to start and reset buttons
      startButton.addEventListener('click', startGame);
      resetButton.addEventListener('click', function() {
        location.reload(); // Reload the page to reset the game
      });
    });