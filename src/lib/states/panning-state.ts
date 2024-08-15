import { MoveHandler } from '../handlers/move.handler';
import { ImageZoom } from '..';
import { IdleState } from './idle-state';
import { ElementRect, MousePosition, AbstractState } from './state';

export class PanningState extends AbstractState {
  constructor(
    readonly imageZoom: ImageZoom,
    public rect: ElementRect,
    public zoomLevel: number,
    public mousePosition: MousePosition
  ) {
    super();
  }

  mouseUp(): void {
    this.imageZoom.changeState(new IdleState(this.imageZoom, this.rect, this.zoomLevel));
  }

  mouseLeave(): void {
    this.imageZoom.changeState(new IdleState(this.imageZoom, this.rect, this.zoomLevel));
  }

  mouseMove(event: MouseEvent): void {
    const moveHandler = new MoveHandler();
    Object.assign(this, moveHandler.handle(this, event));
    super.mouseMove(event);
  }
}
