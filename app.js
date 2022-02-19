'use strict';

const tileDisplay = document.querySelector('.container__tile');
const keyboard = document.querySelector('.container__key');
const messageDisplay = document.querySelector('.container__message');

let wordle = 'SUPER';

// Create KEYBOARD function
const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  'DELETE',
];

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const createKeyboard = () => {
  keys.forEach((key) => {
    const btnElement = document.createElement('button');
    btnElement.textContent = key;
    btnElement.setAttribute('id', key);
    btnElement.addEventListener('click', () => handleKeyClick(key));

    keyboard.append(btnElement);
  });
};

const handleKeyClick = (letter) => {
  console.log('CLIIIIIICKED', letter);
  if (letter === 'DELETE') {
    deleteLetter();
    console.log('guessRows: ', guessRows);
    return;
  }
  if (letter === 'ENTER') {
    console.log('Checked row');
    checkRow();
    console.log('guessRows: ', guessRows);
    return;
  }
  addLetter(letter);
};

const createGuessRows = () => {
  guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);

    guessRow.forEach((guess, guessIndex) => {
      const tileElement = document.createElement('div');

      tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
      tileElement.classList.add('tile');
      rowElement.append(tileElement);
    });

    tileDisplay.append(rowElement);
  });
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute('data-letter', letter);
    currentTile++;
    console.log('guessRows: ', guessRows);
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    console.log('Delete letter');
    currentTile--;
    const tileDeleted = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
    tileDeleted.textContent = '';
    guessRows[currentRow][currentTile] = '';
    tileDeleted.setAttribute('data-letter', '');
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join('');
  if (currentTile === 5) {
    addColorToTile();
    if (wordle === guess) {
      showMessage('Magnificent!');
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        isGameOver = false;
        showMessage('Game over');
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
  }
  console.log('The guess is ' + guess, ', and the wordle is ' + wordle);
};

const showMessage = (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);

  setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};

const addColorToTile = () => {
  const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes;
  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute('data-letter');

    setTimeout(() => {
      tile.classList.add('flip');
      if (dataLetter == wordle[index]) {
        tile.classList.add('overlay-green');
        addColorToKey(dataLetter, 'overlay-green');
      } else if (wordle.includes(dataLetter)) {
        tile.classList.add('overlay-yellow');
        addColorToKey(dataLetter, 'overlay-yellow');
      } else {
        tile.classList.add('overlay-grey');
        addColorToKey(dataLetter, 'overlay-grey');
      }
    }, 200 * index);
  });
};

const addColorToKey = (keyLetter, colorStyle) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(colorStyle);
};

createKeyboard();
createGuessRows();
