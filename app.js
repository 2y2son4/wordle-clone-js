'use strict';

const tileDisplay = document.querySelector('.title__container');
const keyboard = document.querySelector('.key__container');

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
  '«',
];

const handleKeyClick = (ev) => {
  console.log('CLIIIIIICK', ev.target.id);
};

const createKeyboard = () => {
  keys.forEach((key) => {
    const btnElement = document.createElement('button');

    btnElement.textContent = key;
    btnElement.setAttribute('id', key);
    btnElement.addEventListener('click', handleKeyClick);

    keyboard.append(btnElement);
  });

  return keyboard;
};

createKeyboard();

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
