import { Grid, GridPosition } from './grid';
import { Player } from './player';
import { ColorText } from '../utils/colorText';
import { Readline } from '../utils/readline';

export class Game {
  private readonly _readLine: Readline;

  private _players: Player[];
  private _score: { [key: string]: number } = {};
  private _stringMap = {
    [GridPosition.EMPTY]: '0 ',
    [GridPosition.YELLOW]: 'Y ',
    [GridPosition.RED]: 'R ',
  };

  constructor(private readonly _grid: Grid, private readonly _connectN: number, private readonly _targetScore: number) {
    this._readLine = new Readline();
    this._players = [new Player('Player 1', GridPosition.YELLOW), new Player('Player 2', GridPosition.RED)];

    for (const player of this._players) {
      this._score[player.name] = 0;
    }
  }

  public async play() {
    let maxScore = 0;
    let winner: Player | null = null;

    while (maxScore < this._targetScore) {
      winner = await this._playRound();
      maxScore = Math.max(maxScore, this._score[winner.name]);
      this._printBoard();

      if (maxScore < this._targetScore) {
        await this._readLine.promptQuestion(
          ColorText[winner.pieceColor === GridPosition.YELLOW ? 'yellow' : 'red'](
            `${winner.name} won the round, press enter to continue`,
          ),
        );
      }

      this._grid.reset();
    }

    this._readLine.close();

    if (!winner) {
      throw new Error('No winner found');
    }

    console.log(ColorText.green(`${winner.name} won the game with a score of ${maxScore}`));
  }

  private _printBoard() {
    this._readLine.clearConsole();

    console.log(
      ColorText.blue(
        `Score: ${this._players.map(player => `${player.name}: ${this._score[player.name]}`).join(', ')}\n`,
      ),
    );

    console.log('Board:\n');

    const grid = this._grid.grid;
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = 0; i < rows; i++) {
      let rowString = '';

      for (let j = 0; j < cols; j++) {
        const cell = this._stringMap[grid[i][j]];
        if (grid[i][j] === GridPosition.YELLOW) rowString += ColorText.yellow(cell);
        else if (grid[i][j] === GridPosition.RED) rowString += ColorText.red(cell);
        else rowString += cell;
      }

      console.log(rowString);
    }

    console.log('');
  }

  private async _playMove(player: Player) {
    this._printBoard();
    const colCnt = this._grid.columnCount;
    const promptText = ColorText[player.pieceColor === GridPosition.YELLOW ? 'yellow' : 'red'](
      `${player.name}! Enter column between 0 and ${colCnt - 1} to add piece: `,
    );
    const answer = await this._readLine.promptQuestion(promptText);
    const moveCol = Number(answer);
    const moveRow = this._grid.placePiece(moveCol, player.pieceColor);

    return [moveRow, moveCol];
  }

  private async _playRound(): Promise<Player> {
    while (true) {
      for (const player of this._players) {
        const [row, col] = await this._playMove(player);
        const pieceColor = player.pieceColor;
        if (this._grid.checkWin(this._connectN, row, col, pieceColor)) {
          this._score[player.name]++;
          return player;
        }
      }
    }
  }
}
