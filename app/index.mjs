import Game from './game/Game.mjs';

const canvas = document.getElementById('gameCanvas');
const restartButton = document.getElementById('restartButton');
const game = new Game(canvas);

restartButton.addEventListener('click', () => game.restart());

game.start();