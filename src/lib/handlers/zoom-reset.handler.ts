import { ZoomResetCommand } from '../commands/zoom-reset';
import { CommandHandler } from './command.handler';

export class ZoomResetHandler extends CommandHandler {
  constructor() {
    super(new ZoomResetCommand());
  }
}
