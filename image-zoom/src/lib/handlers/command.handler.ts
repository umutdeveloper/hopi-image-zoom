import { Command } from '../commands/command';
import { State } from '../states/state';
import { AbstractHandler } from './handler';

export abstract class CommandHandler extends AbstractHandler {
  constructor(private command: Command) {
    super();
  }
  public handle(state: State, event?: Event): State | null {
    if (this.command.isExecutable(state, event)) {
      return this.command.execute(state, event);
    }
    return super.handle(state, event);
  }
}
