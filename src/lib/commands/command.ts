import { State } from '../states/state';

export interface Command {
  execute(state: State, event?: Event): State;
  isExecutable(state: State, event?: Event): boolean;
}

export abstract class AbstractCommand implements Command {
  abstract execute(state: State, event?: Event): State;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isExecutable(_: State, __?: Event): boolean {
    return true;
  }
}
