import { GridPosition } from './grid';

export class Player {
  constructor(private readonly _name: string, private readonly _pieceColor: GridPosition.YELLOW | GridPosition.RED) {}

  public get name() {
    return this._name;
  }

  public get pieceColor() {
    return this._pieceColor;
  }
}
