import { MousePosition, State } from '../states/state';
import { getZoomOffset } from '../utils/get-zoom-offset';
import { AbstractCommand } from './command';

export class ZoomResetCommand extends AbstractCommand {
  execute(state: State): State {
    const options = state.imageZoom.getOptions();
    const newZoomLevel = options.minZoomLevel;
    const clickPos: MousePosition = {
      x: state.rect.width / 2 + state.rect.left,
      y: state.rect.height / 2 + state.rect.top,
    };
    const newOffset = getZoomOffset(clickPos, newZoomLevel, state.rect, state.zoomLevel);
    state.zoomLevel = newZoomLevel;
    state.rect.offsetX = newOffset.offsetX;
    state.rect.offsetY = newOffset.offsetY;
    return state;
  }
}
