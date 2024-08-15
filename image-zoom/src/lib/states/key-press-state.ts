import { ZoomHandler } from '../handlers/zoom.handler';
import { ImageZoom } from '..';
import { isSupportedKeyEvent } from '../utils/is-supported-key-event';
import { IdleState } from './idle-state';
import { ElementRect, AbstractState } from './state';

export class KeyPressState extends AbstractState {
  constructor(
    readonly imageZoom: ImageZoom,
    public rect: ElementRect,
    public zoomLevel: number
  ) {
    super();
  }

  wheel(event: WheelEvent): void {
    const zoomHandler = new ZoomHandler();
    Object.assign(this, zoomHandler.handle(this, event));
    super.wheel(event);
  }

  keyUp(event: KeyboardEvent): void {
    if (isSupportedKeyEvent(event, this.imageZoom.getOptions().supportedKeyBindings)) {
      this.imageZoom.changeState(new IdleState(this.imageZoom, this.rect, this.zoomLevel));
    }
  }
}
