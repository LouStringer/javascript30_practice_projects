clueNumber = document.querySelector('.clue-number');
clueText = document.querySelector('.clue-text');
codeInput = document.querySelector('input');
resetButton = document.querySelector('button');
let clueCounter = 0;
let codeGuess = [];

clueArray = [
  {number: 1, text: 'total height of Burj Kalifa', code: '8 3 0' },
  {number: 2, text: 'secret inspector', code:'m o r s e' },
  {number: 3, text: 'witch green', code:'# 4 d c 3 3 1'},
  {number: 4, text: 'KONAMI!', code: 'up down up down left right left right a b'}
];

const updateHTML = clues => {
  if (clueCounter < 4 ) {
    clueNumber.innerHTML = `clue ${clues[clueCounter].number}`;
    clueText.innerHTML = clues[clueCounter].text;
  } else {
    clueNumber.innerHTML = '';
    clueText.innerHTML = 'congratulations, you have solved all the codes!';
    codeInput.classList.add('hide');
    resetButton.classList.add('hide');
  }
  codeInput.value = '';
  codeGuess.length = 0;
};

codeInput.addEventListener('keyup', e => {
  let key = e.key;
  if (key != 'Alt') {codeGuess.push(`${key}`.replace(/^Arrow/, '').toLowerCase())};
  if (codeGuess.length > 10) {
    codeGuess.splice(-codeGuess.length - 1, 1)
  }
  codeInput.value = codeGuess.join(' ');
  if (codeInput.value.includes(clueArray[clueCounter].code)) {
    clueCounter++;
    updateHTML(clueArray);
  }
});

resetButton.addEventListener('click', () => updateHTML(clueArray));

updateHTML(clueArray);
