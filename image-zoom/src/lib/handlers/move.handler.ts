import { MoveCommand } from '../commands/move';
import { CommandHandler } from './command.handler';

export class MoveHandler extends CommandHandler {
  constructor() {
    super(new MoveCommand());
  }
}
