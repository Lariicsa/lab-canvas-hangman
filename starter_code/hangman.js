var hangman
var words = [
  //'California',
  'Berlin',
  // 'Francisco',
  // 'boton',
  // 'carreola',
  // 'Paris',
  // 'londo',
  // 'chicago',
  // 'tokio',
  // 'telefono',
  // 'blanco',
  // 'tomate',
  // 'pantalla',
  // 'azul',
  // 'diferencia',
  // 'bacteria',
  // 'detective',
  // 'titulo',
  // 'protesta',
  // 'caracol'
]

function Hangman() {
  this.words = words
  this.secretWord = ''
  this.letters = []
  this.guessedLetter = ''
  this.errorsLeft = 10
}

Hangman.prototype.getWord = function() {
  return this.words[Math.floor(Math.random() * this.words.length)].toUpperCase()
}

Hangman.prototype.checkIfLetter = function(keyUser) {
  if(keyUser >= 48 && keyUser <= 90) {
    return true
  }
  return false
}

Hangman.prototype.checkClickedLetters = function(key) {
  if (this.letters.includes(key)) return false
  return true
}

Hangman.prototype.addCorrectLetter = function(i) {
  this.guessedLetter += this.secretWord[i].toUpperCase()
  this.checkWinner()
}

Hangman.prototype.addWrongLetter = function(letter) {
  this.errorsLeft--
  this.checkGameOver()
}

Hangman.prototype.checkGameOver = function() {
  if (this.errorsLeft === 0) return true
  return false
}

Hangman.prototype.checkWinner = function() {
  for (var j = 0; j < this.secretWord.length; j++) {
    if (this.guessedLetter.indexOf(this.secretWord[j]) === -1) return false
  }
  return true
}

document.getElementById("start-game-button").onclick = function() {
  hangman = new Hangman();
  hangman.secretWord = hangman.getWord();
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
  hangmanCanvas.drawLines(); 
};

document.onkeydown = function(e) {
  if (hangman !== undefined && hangmanCanvas.start === 0) {
    if (hangman.checkIfLetter(e.keyCode)) {
      let up = e.key.toUpperCase();
      if (hangman.checkClickedLetters(up)) {
        hangman.letters.push(up);
        if (hangman.secretWord.indexOf(up) >= 0) {
          hangmanCanvas.writeCorrectLetter(hangman.secretWord.indexOf(up));
          hangman.addCorrectLetter(hangman.secretWord.indexOf(up));
          if (hangman.checkWinner()) {
            hangmanCanvas.winner();
          }
        } else {
          hangman.addWrongLetter();
          hangmanCanvas.writeWrongLetter(up, hangman.errorsLeft);
        }
      }
    }
  }
};
