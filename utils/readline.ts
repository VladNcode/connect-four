import readline from 'node:readline';

export class Readline {
  private rl;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  promptQuestion(promptText: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.rl.question(promptText, resolve);
    });
  }

  clearConsole() {
    process.stdout.write('\x1b[H'); // Move cursor to top-left corner
    process.stdout.write('\x1b[2J'); // Clear screen
  }

  close() {
    this.rl.close();
  }
}
