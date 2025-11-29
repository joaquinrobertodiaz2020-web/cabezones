// --------------------------------------------
// BASE RECTANGLE COLLISION
// --------------------------------------------
export function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// --------------------------------------------
// PLAYER vs PLAYER COLLISION RESOLUTION
// --------------------------------------------
export function resolvePlayersCollision(p1, p2, floorHeight, screenWidth, screenHeight) {
  if (!checkCollision(p1, p2)) return { p1, p2 };

  const dx =
    p1.x + p1.width / 2 - (p2.x + p2.width / 2);
  const dy =
    p1.y + p1.height / 2 - (p2.y + p2.height / 2);

  const overlapX = p1.width - Math.abs(dx);
  const overlapY = p1.height - Math.abs(dy);

  // ----- Horizontal collision -----
  if (overlapX < overlapY) {
    const push = overlapX / 2;

    let newP1X = p1.x + (dx > 0 ? push : -push);
    let newP2X = p2.x + (dx > 0 ? -push : push);

    // Keep inside boundaries
    newP1X = Math.max(0, Math.min(screenWidth - p1.width, newP1X));
    newP2X = Math.max(0, Math.min(screenWidth - p2.width, newP2X));

    return {
      p1: { ...p1, x: newP1X },
      p2: { ...p2, x: newP2X },
    };
  }

  // ----- Vertical collision (stacking) -----
  const push = overlapY / 2;

  let newP1Y = p1.y + (dy > 0 ? push : -push);
  let newP2Y = p2.y + (dy > 0 ? -push : push);

  const ground1 = screenHeight - floorHeight - p1.height;
  const ground2 = screenHeight - floorHeight - p2.height;

  newP1Y = Math.min(newP1Y, ground1);
  newP2Y = Math.min(newP2Y, ground2);

  return {
    p1: { ...p1, y: newP1Y, velY: 0, jumping: false },
    p2: { ...p2, y: newP2Y, velY: 0, jumping: false },
  };
}
