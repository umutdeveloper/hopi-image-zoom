import { ZoomOutCommand } from '../commands/zoom-out';
import { CommandHandler } from './command.handler';

export class ZoomOutHandler extends CommandHandler {
  constructor() {
    super(new ZoomOutCommand());
  }
}
