import './styles/main.scss';
import Game from './game/game';

let tetris;

// window.addEventListener('resize', () => resizeThrottler('canvas'), false);
// document.addEventListener('DOMContentLoaded', () => {
//   actualResizeHandler('canvas');
//   actualResizeHandler('canvas');
// why the heck does width not finish setting till after the first resize?
// });

const canvas = document.getElementById('canvas');
const gameBtn = document.getElementById('gameButton');
gameBtn.addEventListener('click', () => {
  tetris = Game({ canvas });
  tetris.play();
});
