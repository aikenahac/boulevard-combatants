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
  (document.querySelector('#displayText') as any).style.display = 'flex';
  if (player1.health === player2.health) {
    document.querySelector('#displayText').innerHTML = 'Tie';
  } else if (player1.health > player2.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
  } else if (player1.health < player2.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
  }
}
