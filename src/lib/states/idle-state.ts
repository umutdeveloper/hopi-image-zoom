import { DoubleTapForMacHandler } from '../handlers/double-tap-for-mac.handler';
import { createHandler } from '../handlers/handler';
import { MoveWithTouchpadHandler } from '../handlers/move-with-touchpad.handler';
import { ZoomInHandler } from '../handlers/zoom-in.handler';
import { ZoomOutHandler } from '../handlers/zoom-out.handler';
import { ZoomHandler } from '../handlers/zoom.handler';
import { ImageZoom } from '..';
import { isSupportedKeyEvent } from '../utils/is-supported-key-event';
import { KeyPressState } from './key-press-state';
import { PanningState } from './panning-state';
import { ElementRect, AbstractState } from './state';

export class IdleState extends AbstractState {
  constructor(
    readonly imageZoom: ImageZoom,
    public rect: ElementRect,
    public zoomLevel: number
  ) {
    super();
  }

  wheel(event: WheelEvent & { wheelDeltaY: number }): void {
    const wheelHandler = createHandler(new DoubleTapForMacHandler(), new MoveWithTouchpadHandler(), new ZoomHandler());
    Object.assign(this, wheelHandler.handle(this, event));
    super.wheel(event);
  }

  keyDown(event: KeyboardEvent): void {
    if (isSupportedKeyEvent(event, this.imageZoom.getOptions().supportedKeyBindings)) {
      this.imageZoom.changeState(new KeyPressState(this.imageZoom, this.rect, this.zoomLevel));
    }
  }

  mouseDown(event: MouseEvent): void {
    this.imageZoom.changeState(
      new PanningState(this.imageZoom, this.rect, this.zoomLevel, { x: event.clientX, y: event.clientY })
    );
  }

  zoomIn(): void {
    const zoomInHandler = new ZoomInHandler();
    Object.assign(this, zoomInHandler.handle(this));
    super.zoomIn();
  }

  zoomOut(): void {
    const zoomOutHandler = new ZoomOutHandler();
    Object.assign(this, zoomOutHandler.handle(this));
    super.zoomOut();
  }
}
