export function hitBall(player, ball) {
  const power = 9;
  const ballCenter = ball.x + ball.width / 2;
  const playerCenter = player.x + player.width / 2;

  const horizontal = ballCenter > playerCenter ? 1 : -1;
  const vertical = player.jumping ? -6 : -3;

  return {
    velX: horizontal * power,
    velY: vertical,
  };
}
