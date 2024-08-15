import { MousePosition, State } from '../states/state';
import { getZoomOffset } from '../utils/get-zoom-offset';
import { AbstractCommand } from './command';

export class ZoomOutCommand extends AbstractCommand {
  execute(state: State): State {
    const options = state.imageZoom.getOptions();
    if (state.zoomLevel > options.minZoomLevel) {
      const newZoomLevel = state.zoomLevel - 1;
      const clickPos: MousePosition = {
        x: state.rect.width / 2 + state.rect.left,
        y: state.rect.height / 2 + state.rect.top,
      };
      const newOffset = getZoomOffset(clickPos, newZoomLevel, state.rect, state.zoomLevel);
      state.zoomLevel = newZoomLevel;
      state.rect.offsetX = newOffset.offsetX;
      state.rect.offsetY = newOffset.offsetY;
    }
    return state;
  }
}
