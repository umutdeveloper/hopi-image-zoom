import { MousePosition, State } from '../states/state';
import { getZoomOffset } from '../utils/get-zoom-offset';
import { isDoubleTapForMac } from '../utils/is-double-tap-for-mac';
import { AbstractCommand } from './command';

export class DoubleTapForMacCommand extends AbstractCommand {
  execute(state: State, event: WheelEvent): State {
    event.preventDefault();
    const pos: MousePosition = { x: event.clientX, y: event.clientY };
    const options = state.imageZoom.getOptions();
    const newZoomLevel = state.zoomLevel === options.minZoomLevel ? options.maxZoomLevel : options.minZoomLevel;
    const newOffset = getZoomOffset(pos, newZoomLevel, state.rect, state.zoomLevel);
    state.zoomLevel = newZoomLevel;
    state.rect.offsetX = newOffset.offsetX;
    state.rect.offsetY = newOffset.offsetY;
    return state;
  }

  isExecutable(_: State, event: WheelEvent & { wheelDeltaY: number }): boolean {
    return isDoubleTapForMac(event);
  }
}
