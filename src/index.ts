import { Combatant } from './lib/combatant';
import { music } from './lib/settings';
import { Sprite } from './lib/sprite';
import { rectangularCollision, determineWinner } from './lib/utils';

const canvas = document.body.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.width = 1024;
canvas.height = 576;

music.play();

const background = new Sprite(
  ctx,
  { x: 0, y: 0 },
  new URL('./assets/forest/background.png', import.meta.url).toString(),
);

const extra = new Sprite(
  ctx,
  { x: 600, y: 128 },
  new URL('./assets/forest/shop.png', import.meta.url).toString(),
  2.75,
  6,
);

const player1 = new Combatant(
  canvas,
  ctx,
  { x: 100, y: 0 },
  { x: 0, y: 0 },
  new URL('./assets/player1/idle.png', import.meta.url).toString(),
  2.5,
  8,
  { x: 215, y: 157 },
  {
    offset: {
      x: 100,
      y: 50,
    },
    width: 160,
    height: 50,
  },
);

const player2 = new Combatant(
  canvas,
  ctx,
  { x: 800, y: 100 },
  { x: 0, y: 0 },
  new URL('./assets/player2/idle.png', import.meta.url).toString(),
  2.5,
  4,
  { x: 215, y: 167 },
  {
    offset: {
      x: -170,
      y: 50,
    },
    width: 170,
    height: 50,
  },
);

const keys = {
  left1: {
    pressed: false,
  },
  right1: {
    pressed: false,
  },
  left2: {
    pressed: false,
  },
  right2: {
    pressed: false,
  },
};

function play() {
  window.requestAnimationFrame(play.bind(this));

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  extra.update();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  if (keys.left1.pressed && player1.lastKey === 'a') {
    player1.velocity.x = -5;
  } else if (keys.right1.pressed && player1.lastKey === 'd') {
    player1.velocity.x = 5;
  }

  if (keys.left2.pressed && player2.lastKey === 'ArrowLeft') {
    player2.velocity.x = -5;
  } else if (keys.right2.pressed && player2.lastKey === 'ArrowRight') {
    player2.velocity.x = 5;
  }

  if (
    rectangularCollision({
      rectangle1: player1,
      rectangle2: player2,
    }) &&
    player1.isAttacking &&
    player1.currentFrames === 4
  ) {
    player2.takeHit('2');
    player1.isAttacking = false;
  }

  if (player1.isAttacking && player1.currentFrames === 4) {
    player1.isAttacking = false;
  }

  if (
    rectangularCollision({
      rectangle1: player2,
      rectangle2: player1,
    }) &&
    player2.isAttacking &&
    player2.currentFrames === 2
  ) {
    player1.takeHit('1');
    player2.isAttacking = false;
  }

  if (player2.isAttacking && player2.currentFrames === 2) {
    player2.isAttacking = false;
  }

  if (player2.health <= 0 || player1.health <= 0) {
    determineWinner(player1, player2);
  }
}

play();

const player1attack = new Audio(
  new URL('./assets/sounds/player1_hit.wav', import.meta.url).toString(),
);
player1attack.volume = /*parseInt(localStorage.getItem('volume')) / 100 || */ 0.5;

const player2attack = new Audio(
  new URL('./assets/sounds/player2_hit.wav', import.meta.url).toString(),
);
player2attack.volume = /*parseInt(localStorage.getItem('volume')) / 100 ||*/ 0.5;

window.addEventListener('keydown', (event) => {
  if (!player1.dead) {
    switch (event.key) {
      case 'd':
        keys.right1.pressed = true;
        player1.lastKey = 'd';
        break;
      case 'a':
        keys.left1.pressed = true;
        player1.lastKey = 'a';
        break;
      case 'w':
        player1.velocity.y = -20;
        break;
      case ' ':
        player1.attack();
        console.log(player2.health);
        player1attack.play();
        break;
    }
  }

  if (!player2.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.right2.pressed = true;
        player2.lastKey = 'ArrowRight';
        break;
      case 'ArrowLeft':
        keys.left2.pressed = true;
        player2.lastKey = 'ArrowLeft';
        break;
      case 'ArrowUp':
        player2.velocity.y = -20;
        break;
      case 'ArrowDown':
        player2.attack();
        console.log(player1.health);
        player2attack.play();
        break;
    }
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.right1.pressed = false;
      break;
    case 'a':
      keys.left1.pressed = false;
      break;
  }

  // player2 keys
  switch (event.key) {
    case 'ArrowRight':
      keys.right2.pressed = false;
      break;
    case 'ArrowLeft':
      keys.left2.pressed = false;
      break;
  }
});
