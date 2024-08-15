import { ViewNotifier } from './observers/view-notifier';
import { ViewObserver } from './observers/view-observer';
import { IdleState } from './states/idle-state';
import { State } from './states/state';
import { ViewStrategy } from './strategies/view.strategy';

export interface ImageZoomOptions {
  minZoomLevel: number;
  maxZoomLevel: number;
  supportedKeyBindings: string[];
}

const DEFAULT_OPTIONS: ImageZoomOptions = {
  minZoomLevel: 1,
  maxZoomLevel: 5,
  supportedKeyBindings: ['Meta', 'Control'],
};

export class ImageZoom {
  private state!: State;
  private options: ImageZoomOptions;

  readonly viewNotifier = new ViewNotifier();

  constructor(
    readonly viewStrategy: ViewStrategy,
    options?: Partial<ImageZoomOptions>
  ) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.viewStrategy.render();
    this.viewNotifier.addObserver(new ViewObserver(this.viewStrategy.update.bind(viewStrategy)));
    this.changeState(new IdleState(this, this.viewStrategy.getRect(), this.options.minZoomLevel));
  }

  getOptions() {
    return this.options;
  }

  changeState(state: State) {
    this.state = state;
    this.viewStrategy.bindEvents(this.state);
  }

  zoomIn() {
    this.state.zoomIn();
  }

  zoomOut() {
    this.state.zoomOut();
  }

  destroy() {
    this.viewStrategy.destroy();
  }
}
