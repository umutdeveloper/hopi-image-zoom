import { MousePosition, State } from '../states/state';
import { getZoomOffset } from '../utils/get-zoom-offset';
import { AbstractCommand } from './command';

export class ZoomCommand extends AbstractCommand {
  execute(state: State, event: WheelEvent): State {
    event.preventDefault();
    const delta = Math.sign(event.deltaY) * 0.01 * state.zoomLevel;
    const options = state.imageZoom.getOptions();
    const newZoomLevel = Math.min(options.maxZoomLevel, Math.max(options.minZoomLevel, state.zoomLevel - delta));
    const clickPos: MousePosition = { x: event.clientX, y: event.clientY };
    const newOffset = getZoomOffset(clickPos, newZoomLevel, state.rect, state.zoomLevel);
    state.zoomLevel = newZoomLevel;
    state.rect.offsetX = newOffset.offsetX;
    state.rect.offsetY = newOffset.offsetY;
    return state;
  }
}
