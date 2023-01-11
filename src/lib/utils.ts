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

export function determineWinner(player1, player2) {
  if (player1.health === player2.health) {
    document.getElementById('displayText').innerHTML = 'Tie';
    console.log('Game end: tie');
  } else if (player1.health > player2.health) {
    console.log('Player 1 Wins');
  } else if (player1.health < player2.health) {
    console.log('Player 2 Wins');
  }
}
