import { ZoomResetHandler } from '../handlers/zoom-reset.handler';
import { ImageZoom } from '..';

export interface ElementRect {
  width: number;
  height: number;
  left: number;
  top: number;
  offsetX: number;
  offsetY: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface State {
  zoomLevel: number;
  rect: ElementRect;
  imageZoom: ImageZoom;
  mousePosition?: MousePosition;
  wheel(event: WheelEvent): void;
  keyDown(event: KeyboardEvent): void;
  keyUp(event: KeyboardEvent): void;
  mouseDown(event: MouseEvent): void;
  mouseUp(): void;
  mouseLeave(): void;
  mouseMove(event: MouseEvent): void;
  zoomIn(): void;
  zoomOut(): void;
  reset(rect: ElementRect): void;
}

export abstract class AbstractState implements State {
  abstract zoomLevel: number;
  abstract rect: ElementRect;
  abstract imageZoom: ImageZoom;
  mousePosition?: MousePosition;

  private notifyView() {
    this.imageZoom.viewNotifier.notify({ rect: this.rect, zoomLevel: this.zoomLevel });
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  wheel(_: WheelEvent): void {
    this.notifyView();
  }
  keyDown(_: KeyboardEvent): void {}
  keyUp(_: KeyboardEvent): void {}
  mouseDown(_: MouseEvent): void {}
  mouseUp(): void {}
  mouseLeave(): void {}
  mouseMove(_: MouseEvent): void {
    this.notifyView();
  }
  zoomIn(): void {
    this.notifyView();
  }
  zoomOut(): void {
    this.notifyView();
  }
  reset(rect: ElementRect): void {
    this.rect = rect;
    const zoomResetHandler = new ZoomResetHandler();
    Object.assign(this, zoomResetHandler.handle(this));
    this.notifyView();
  }
}
