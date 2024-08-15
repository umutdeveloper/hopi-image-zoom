import { State } from '../states/state';

interface Handler {
  setNext(handler: Handler): Handler;
  handle(state: State, event?: Event): State | null;
}

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(state: State, event?: Event): State | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(state, event);
    }

    return null;
  }
}

export function createHandler(...handlers: AbstractHandler[]) {
  handlers.forEach((handler, index) => {
    if (index + 1 !== handlers.length) {
      handler.setNext(handlers[index + 1]);
    }
  });

  return handlers[0];
}
