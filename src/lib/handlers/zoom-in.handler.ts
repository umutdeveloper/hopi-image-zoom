import { ZoomInCommand } from '../commands/zoom-in';
import { CommandHandler } from './command.handler';

export class ZoomInHandler extends CommandHandler {
  constructor() {
    super(new ZoomInCommand());
  }
}
