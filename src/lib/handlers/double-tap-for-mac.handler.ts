import { DoubleTapForMacCommand } from '../commands/double-tap-for-mac';
import { CommandHandler } from './command.handler';

export class DoubleTapForMacHandler extends CommandHandler {
  constructor() {
    super(new DoubleTapForMacCommand());
  }
}
