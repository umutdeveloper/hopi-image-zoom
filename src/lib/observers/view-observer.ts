import { ElementRect } from '../states/state';

export interface ObserverChanges {
  rect?: ElementRect;
  zoomLevel?: number;
}

interface Observer {
  update(changes: ObserverChanges): void;
}

export class ViewObserver implements Observer {
  constructor(readonly callback: (changes: ObserverChanges) => void) {}
  update(changes: ObserverChanges): void {
    this.callback(changes);
  }
}
