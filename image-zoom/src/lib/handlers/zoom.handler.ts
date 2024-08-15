import { ZoomCommand } from '../commands/zoom';
import { CommandHandler } from './command.handler';

export class ZoomHandler extends CommandHandler {
  constructor() {
    super(new ZoomCommand());
  }
}
