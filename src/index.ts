import { Combatant } from './lib/combatant';
import { Sprite } from './lib/sprite';
import { rectangularCollision, determineWinner } from './lib/utils';

const canvas = document.body.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.width = 1024;
canvas.height = 576;

const player1idle = new Image();
player1idle.src = new URL(
  './assets/player1/idle.png',
  import.meta.url,
).toString();

const player1run = new Image();
player1run.src = new URL(
  './assets/player1/run.png',
  import.meta.url,
).toString();

const player1jump = new Image();
player1jump.src = new URL(
  './assets/player1/jump.png',
  import.meta.url,
).toString();

const player1fall = new Image();
player1fall.src = new URL(
  './assets/player1/fall.png',
  import.meta.url,
).toString();

const player1attack = new Image();
player1attack.src = new URL(
  './assets/player1/attack.png',
  import.meta.url,
).toString();

const player1takeHit = new Image();
player1takeHit.src = new URL(
  './assets/player1/take_hit.png',
  import.meta.url,
).toString();

const player1death = new Image();
player1death.src = new URL(
  './assets/player1/death.png',
  import.meta.url,
).toString();

// aaaa
const player2idle = new Image();
player2idle.src = new URL(
  './assets/player2/idle.png',
  import.meta.url,
).toString();

const player2run = new Image();
player2run.src = new URL(
  './assets/player2/run.png',
  import.meta.url,
).toString();

const player2jump = new Image();
player2jump.src = new URL(
  './assets/player2/jump.png',
  import.meta.url,
).toString();

const player2fall = new Image();
player2fall.src = new URL(
  './assets/player2/fall.png',
  import.meta.url,
).toString();

const player2attack = new Image();
player2attack.src = new URL(
  './assets/player2/attack.png',
  import.meta.url,
).toString();

const player2takeHit = new Image();
player2takeHit.src = new URL(
  './assets/player2/take_hit.png',
  import.meta.url,
).toString();

const player2death = new Image();
player2death.src = new URL(
  './assets/player2/death.png',
  import.meta.url,
).toString();

const background = new Sprite(
  ctx,
  { x: 0, y: 0 },
  new URL('./assets/forest/background.png', import.meta.url).toString(),
);

const shop = new Sprite(
  ctx,
  { x: 600, y: 128 },
  new URL('./assets/forest/shop.png', import.meta.url).toString(),
  2.75,
  6,
);

const player1 = new Combatant(
  canvas,
  ctx,
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  new URL('./assets/player1/idle.png', import.meta.url).toString(),
  2.5,
  8,
  { x: 215, y: 157 },
  {
    idle: {
      source: new URL('./assets/player1/idle.png', import.meta.url).toString(),
      maxFrames: 8,
      image: player1idle,
    },
    run: {
      source: new URL('./assets/player1/run.png', import.meta.url).toString(),
      maxFrames: 8,
      image: player1run,
    },
    jump: {
      source: new URL('./assets/player1/jump.png', import.meta.url).toString(),
      maxFrames: 2,
      image: player1jump,
    },
    fall: {
      source: new URL('./assets/player1/fall.png', import.meta.url).toString(),
      maxFrames: 2,
      image: player1fall,
    },
    attack: {
      source: new URL(
        './assets/player1/attack.png',
        import.meta.url,
      ).toString(),
      maxFrames: 6,
      image: player1attack,
    },
    takeHit: {
      source: new URL(
        './assets/player1/take_hit.png',
        import.meta.url,
      ).toString(),
      maxFrames: 4,
      image: player1takeHit,
    },
    death: {
      source: new URL('./assets/player1/death.png', import.meta.url).toString(),
      maxFrames: 6,
      image: player1death,
    },
  },
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
  { x: 400, y: 100 },
  { x: 0, y: 0 },
  new URL('./assets/player2/idle.png', import.meta.url).toString(),
  2.5,
  8,
  { x: 215, y: 167 },
  {
    idle: {
      source: new URL('./assets/player2/idle.png', import.meta.url).toString(),
      maxFrames: 4,
      image: player2idle,
    },
    run: {
      source: new URL('./assets/player2/run.png', import.meta.url).toString(),
      maxFrames: 10,
      image: player2run,
    },
    jump: {
      source: new URL('./assets/player2/jump.png', import.meta.url).toString(),
      maxFrames: 2,
      image: player2jump,
    },
    fall: {
      source: new URL('./assets/player2/fall.png', import.meta.url).toString(),
      maxFrames: 2,
      image: player2fall,
    },
    attack: {
      source: new URL(
        './assets/player2/attack.png',
        import.meta.url,
      ).toString(),
      maxFrames: 4,
      image: player2attack,
    },
    takeHit: {
      source: new URL(
        './assets/player2/take_hit.png',
        import.meta.url,
      ).toString(),
      maxFrames: 3,
      image: player2takeHit,
    },
    death: {
      source: new URL('./assets/player2/death.png', import.meta.url).toString(),
      maxFrames: 7,
      image: player2death,
    },
  },
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
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function play() {
  window.requestAnimationFrame(play.bind(this));

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  if (keys.a.pressed && player1.lastKey === 'a') {
    player1.setSprite('run');
    player1.velocity.x = -5;
  } else if (keys.d.pressed && player1.lastKey === 'd') {
    player1.velocity.x = 5;
    player1.setSprite('run');
  } else player1.setSprite('idle');

  if (player1.velocity.y < 0) player1.setSprite('jump');
  else if (player1.velocity.y > 0) player1.setSprite('fall');

  if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
    player2.velocity.x = -5;
    player2.setSprite('run');
  } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
    player2.velocity.x = 5;
    player2.setSprite('run');
  } else player2.setSprite('idle');

  if (player2.velocity.y < 0) {
    player2.setSprite('jump');
  } else if (player2.velocity.y > 0) {
    player2.setSprite('fall');
  }

  if (
    rectangularCollision({
      rectangle1: player1,
      rectangle2: player2,
    }) &&
    player1.isAttacking &&
    player1.currentFrames === 4
  ) {
    player2.takeHit();
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
    player1.takeHit();
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

window.addEventListener('keydown', (event) => {
  if (!player1.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true;
        player1.lastKey = 'd';
        break;
      case 'a':
        keys.a.pressed = true;
        player1.lastKey = 'a';
        break;
      case 'w':
        player1.velocity.y = -20;
        break;
      case ' ':
        player1.attack();
        break;
    }
  }

  if (!player2.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        player2.lastKey = 'ArrowRight';
        break;
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        player2.lastKey = 'ArrowLeft';
        break;
      case 'ArrowUp':
        player2.velocity.y = -20;
        break;
      case 'ArrowDown':
        player2.attack();
        break;
    }
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
  }

  // player2 keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
});
