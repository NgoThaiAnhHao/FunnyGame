'use strict';

//Get elements
let how = document.querySelector('.how');
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let close = document.querySelector('.close');

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');
let diceEl = document.querySelector('.dice');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');

let playing, dice;
let player = 0;
let current = [0, 0];
let score = [0, 0];

//Default
score0.textContent = 0;
score1.textContent = 0;
playing = true;

//Roll dice
let switchPlayer = function () {
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');
  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Random
    dice = Math.floor(Math.random() * 6) + 1;

    //Screen
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      current[player] += dice;
      document.getElementById(`current--${player}`).textContent =
        current[player];
    } else {
      current[player] = 0;
      document.getElementById(`current--${player}`).textContent =
        current[player];
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[player] += current[player];
    document.getElementById(`score--${player}`).textContent = score[player];
    current[player] = 0;
    document.getElementById(`current--${player}`).textContent = 0;

    if (score[player] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
    }

    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  playing = true;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current0.textContent = 0;
  current1.textContent = 0;
  player = 0;
  current = [0, 0];
  score = [0, 0];
});

//how
const closeFunc = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openFunc = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

how.addEventListener('click', openFunc);

close.addEventListener('click', closeFunc);
overlay.addEventListener('click', closeFunc);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !close.classList.contains('hidden')) {
    closeFunc();
  }
});
