import Game from './game/Game.mjs';

const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);

game.start();