export enum GridPosition {
  EMPTY,
  YELLOW,
  RED,
}

export class Grid {
  private _grid!: GridPosition[][];

  constructor(private readonly _rows: number, private readonly _cols: number) {
    this.reset();
  }

  public get grid() {
    return this._grid;
  }

  public get columnCount() {
    return this._cols;
  }

  public reset() {
    this._grid = Array.from({ length: this._rows }, () => Array.from({ length: this._cols }, () => GridPosition.EMPTY));
  }

  public placePiece(column: number, pieceColor: GridPosition): number {
    if (column < 0 || column >= this.columnCount) {
      throw new Error('Invalid column');
    }

    if (pieceColor === GridPosition.EMPTY) {
      throw new Error('Invalid piece');
    }

    for (let row = this._rows - 1; row >= 0; row--) {
      if (this._grid[row][column] === GridPosition.EMPTY) {
        this._grid[row][column] = pieceColor;
        return row;
      }
    }

    throw new Error('Column is full');
  }

  public checkWin(connectN: number, row: number, col: number, piece: GridPosition) {
    const directions = [
      { row: -1, col: 0 }, // up
      { row: 0, col: 1 }, // right
      { row: 1, col: 1 }, // down-right
      { row: 1, col: 0 }, // down
      { row: 1, col: -1 }, // down-left
      { row: 0, col: -1 }, // left
      { row: -1, col: -1 }, // up-left
    ];

    for (const direction of directions) {
      let count = 1;
      let r = row + direction.row;
      let c = col + direction.col;

      while (r >= 0 && r < this._rows && c >= 0 && c < this._cols && this._grid[r][c] === piece) {
        count++;
        r += direction.row;
        c += direction.col;
      }

      r = row - direction.row;
      c = col - direction.col;

      while (r >= 0 && r < this._rows && c >= 0 && c < this._cols && this._grid[r][c] === piece) {
        count++;
        r -= direction.row;
        c -= direction.col;
      }

      if (count >= connectN) {
        return true;
      }
    }

    return false;
  }
}
