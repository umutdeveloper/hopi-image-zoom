import { ObserverChanges } from '../observers/view-observer';
import { State } from '../states/state';
import { AbstractViewStrategy } from './view.strategy';

/**
 * Example HTML Usage:
 * <div class="zoom-container">
 *   <img src="/image-1.jpg" />
 * </div>
 */
export class ContainerViewStrategy extends AbstractViewStrategy {
  private imageElement: HTMLImageElement;
  constructor(element: HTMLDivElement) {
    super(element);
    this.imageElement = this.element.querySelector('img') as HTMLImageElement;
  }

  render(): void {
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';
    this.element.style.backgroundColor = '#111111';
    this.element.style.textAlign = 'center';
    this.imageElement.style.transition = 'all 0.05s linear';
    this.imageElement.style.objectFit = 'contain';
    this.imageElement.style.width = '100%';
    this.imageElement.style.height = '100%';
    this.imageElement.style.position = 'absolute';
    this.imageElement.style.left = '0px';
    this.imageElement.style.top = '0px';
    this.imageElement.style.pointerEvents = 'none';
  }

  update(viewChanges: ObserverChanges): void {
    requestAnimationFrame(() => {
      if (viewChanges.zoomLevel) {
        this.imageElement.style.width = `${viewChanges.zoomLevel * 100}%`;
        this.imageElement.style.height = `${viewChanges.zoomLevel * 100}%`;
      }
      if (viewChanges.rect) {
        this.imageElement.style.left = `${viewChanges.rect.offsetX}px`;
        this.imageElement.style.top = `${viewChanges.rect.offsetY}px`;
      }
    });
  }

  bindEvents(state: State): void {
    const mouseDown = state.mouseDown.bind(state);
    const mouseUp = state.mouseUp.bind(state);
    const mouseLeave = state.mouseLeave.bind(state);
    state.mouseDown = (event: MouseEvent) => {
      mouseDown(event);
      this.element.style.cursor = 'move';
    };
    state.mouseUp = () => {
      mouseUp();
      this.element.style.cursor = '';
    };
    state.mouseLeave = () => {
      mouseLeave();
      this.element.style.cursor = '';
    };
    super.bindEvents(state);
  }
}
