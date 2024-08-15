import { MoveWithTouchpadCommand } from '../commands/move-with-touchpad';
import { CommandHandler } from './command.handler';

export class MoveWithTouchpadHandler extends CommandHandler {
  constructor() {
    super(new MoveWithTouchpadCommand());
  }
}
