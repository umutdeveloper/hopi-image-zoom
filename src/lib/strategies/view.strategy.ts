import { ObserverChanges } from '../observers/view-observer';
import { ElementRect, State } from '../states/state';

export interface ViewStrategy {
  render(): void;
  getRect(): ElementRect;
  bindEvents(state: State): void;
  update(viewChanges: ObserverChanges): void;
  destroy(): void;
}

type EventListenerFn = (event: Event) => void;
export abstract class AbstractViewStrategy implements ViewStrategy {
  private eventHandlers: { [key: string]: EventListenerFn } = {};
  constructor(readonly element: HTMLElement) {}

  render(): void {}
  getRect(): ElementRect {
    const domRect = this.element.getBoundingClientRect();
    return {
      width: domRect.width,
      height: domRect.height,
      left: domRect.left,
      top: domRect.top,
      offsetX: 0,
      offsetY: 0,
    };
  }
  bindEvents(state: State): void {
    this.removeEventListeners();
    this.createEventHandlers(state);
    this.addEventListeners();
  }
  abstract update(_: ObserverChanges): void;

  destroy(): void {
    this.removeEventListeners();
  }

  private createEventHandlers(state: State) {
    this.eventHandlers['wheel'] = state.wheel.bind(state) as EventListenerFn;
    this.eventHandlers['keydown'] = state.keyDown.bind(state) as EventListenerFn;
    this.eventHandlers['keyup'] = state.keyUp.bind(state) as EventListenerFn;
    this.eventHandlers['mousedown'] = state.mouseDown.bind(state) as EventListenerFn;
    this.eventHandlers['mouseup'] = state.mouseUp.bind(state) as EventListenerFn;
    this.eventHandlers['mouseleave'] = state.mouseLeave.bind(state) as EventListenerFn;
    this.eventHandlers['mousemove'] = state.mouseMove.bind(state) as EventListenerFn;
    this.eventHandlers['resize'] = () => state.reset(this.getRect());
  }

  private addEventListeners() {
    this.element.addEventListener('wheel', this.eventHandlers['wheel']);
    document.addEventListener('keydown', this.eventHandlers['keydown']);
    document.addEventListener('keyup', this.eventHandlers['keyup']);
    this.element.addEventListener('mousedown', this.eventHandlers['mousedown']);
    this.element.addEventListener('mouseup', this.eventHandlers['mouseup']);
    this.element.addEventListener('mouseleave', this.eventHandlers['mouseleave']);
    this.element.addEventListener('mousemove', this.eventHandlers['mousemove']);
    window.addEventListener('resize', this.eventHandlers['resize']);
  }

  private removeEventListeners() {
    Object.entries(this.eventHandlers).forEach(([event, listener]) => {
      if (event === 'keydown' || event === 'keyup') {
        document.removeEventListener(event, listener);
      } else if (event === 'resize') {
        window.removeEventListener(event, listener);
      } else {
        this.element.removeEventListener(event, listener);
      }
    });
  }
}
