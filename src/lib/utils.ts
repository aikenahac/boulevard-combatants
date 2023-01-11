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

export function determineWinner(player1: Combatant, player2: Combatant) {
  if (player1.health === player2.health) {
    console.log('Game end: tie');
  } else if (player1.health > player2.health) {
    console.log('Player 1 Wins');
    player1.victories++;
    document.getElementById(
      'p1v',
    ).innerHTML = `Victories: ${player1.victories}`;
    if (player1.victories === 3) {
    }

    reset(player1, player2);
  } else if (player1.health < player2.health) {
    console.log('Player 2 Wins');
    player2.victories++;
    document.getElementById(
      'p2v',
    ).innerHTML = `Victories: ${player2.victories}`;
    if (player2.victories === 3) {
    }

    reset(player1, player2);
  }
}

function reset(player1: Combatant, player2: Combatant) {
  setTimeout(() => {
    player1.dead = false;
    player2.dead = false;
    player1.health = 100;
    player2.health = 100;

    player1.position = { x: 100, y: 0 };
    player2.position = { x: 800, y: 100 };

    player1.setHealthBar('1', '500px');
    player2.setHealthBar('2', '500px');
  }, 2000);
}
