import { Combatant } from './combatant';

export function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

const winResult = document.getElementById('result-text');

export function determineWinner(player1: Combatant, player2: Combatant) {
  if (player1.health === player2.health) {
    console.log('Game end: tie');
  } else if (player1.health > player2.health) {
    console.log('Player 1 Wins');
    winResult.innerHTML = 'Player 1 Wins this round!';
    winResult.style.display = 'block';

    reset(player1, player2);
  } else if (player1.health < player2.health) {
    console.log('Player 2 Wins');
    winResult.innerHTML = 'Player 2 Wins this round!';
    winResult.style.display = 'block';

    reset(player1, player2);
  }
}

function reset(player1: Combatant, player2: Combatant) {
  setTimeout(() => {
    if (player1.dead) {
      player2.victories++;
      document.getElementById(
        'p2v',
      ).innerHTML = `Victories: ${player2.victories}`;
    }

    if (player2.dead) {
      player1.victories++;
      document.getElementById(
        'p1v',
      ).innerHTML = `Victories: ${player1.victories}`;
    }

    player1.dead = false;
    player2.dead = false;
    player1.health = 100;
    player2.health = 100;

    player1.position = { x: 100, y: 0 };
    player2.position = { x: 800, y: 100 };

    player1.setHealthBar('1', '500px');
    player2.setHealthBar('2', '500px');

    winResult.style.display = 'none';

    if (player1.victories === 3) {
      winResult.innerHTML = 'Player 1 Wins the game!';
      winResult.style.display = 'block';

      player1.dead = true;
      player2.dead = true;

      resetGame(player1, player2);
    }

    if (player2.victories === 3) {
      winResult.innerHTML = 'Player 2 Wins the game!';
      winResult.style.display = 'block';

      player1.dead = true;
      player2.dead = true;

      resetGame(player1, player2);
    }
  }, 1000);
}

function resetGame(player1: Combatant, player2: Combatant) {
  setTimeout(() => {
    player1.victories = 0;
    player2.victories = 0;

    player1.dead = false;
    player2.dead = false;

    winResult.style.display = 'none';

    document.getElementById(
      'p1v',
    ).innerHTML = `Victories: ${player1.victories}`;

    document.getElementById(
      'p2v',
    ).innerHTML = `Victories: ${player2.victories}`;
  }, 3000);
}

export function setGameControls(control: string, key: string) {
  let newControls: Controls;

  newControls[control] = key;
}

export function defaultSettings() {
  if (localStorage.getItem('volume') === null) {
    localStorage.setItem('volume', '50');
  }

  if (localStorage.getItem('player1') === null) {
    const c = {
      jump: 'w',
      left: 'a',
      right: 'd',
      attack: ' ',
    };

    localStorage.setItem('player1', JSON.stringify(c));
  }

  if (localStorage.getItem('player2') === null) {
    const c: Controls = {
      jump: 'ArrowUp',
      left: 'ArrowLeft',
      right: 'ArrowRight',
      attack: 'ArrowDown',
    };

    localStorage.setItem('player2', JSON.stringify(c));
  }
}

export interface Controls {
  jump?: string;
  left?: string;
  right?: string;
  attack?: string;
}

export interface PlayerControls {
  p1: Controls;
  p2: Controls;
}
