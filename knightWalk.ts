function isInBoard(x: number, y: number): boolean {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function posToIndex(pos: string): number[] {
  const arr = ['a','b','c','d','e','f','g','h'];
  let column = 0;
  for(let i = 0; i < arr.length; i++) {
      if(arr[i] === pos[0]){
          column = i;
      }
  }
  let row = parseInt(pos[1]); 
  return [column, row - 1];
}

function getMinMove(start: string, target: string, brokenTiles: string[]): number {
  const dir = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];

  const [sx, sy] = posToIndex(start);
  const [tx, ty] = posToIndex(target);

  if (sx === tx && sy === ty) return 0;

  const board = Array.from({ length: 8 }, () => Array(8).fill(0));

  for (const tile of brokenTiles) {
      const [bx, by] = posToIndex(tile);
      board[bx][by] = -1;
  }


  const queue: [number, number, number][] = [[sx, sy, 0]];

  while (queue.length) {
      const [x, y, moves] = queue.shift()!;

      for (const [dx, dy] of dir) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx === tx && ny === ty) return moves + 1;

          if (isInBoard(nx, ny) && board[nx][ny] === 0) {
              board[nx][ny] = 1;
              queue.push([nx, ny, moves + 1]);
          }
      }
  }

  return -1;
}

console.log(getMinMove('d6', 'h8', ['f6', 'f7']));
