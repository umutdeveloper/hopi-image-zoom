import { ObserverChanges, ViewObserver } from './view-observer';

export class ViewNotifier {
  protected observers: ViewObserver[] = [];

  addObserver(observer: ViewObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: ViewObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(changes: ObserverChanges): void {
    for (const observer of this.observers) {
      observer.update(changes);
    }
  }
}
