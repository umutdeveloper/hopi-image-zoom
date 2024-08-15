import { MousePosition, State } from '../states/state';
import { getMoveOffset } from '../utils/get-move-offset';
import { isDoubleTapForMac } from '../utils/is-double-tap-for-mac';
import { isTrackpadMove } from '../utils/is-trackpad-move';
import { AbstractCommand } from './command';

export class MoveWithTouchpadCommand extends AbstractCommand {
  execute(state: State, event: WheelEvent): State {
    event.preventDefault();
    const mousePos: MousePosition = { x: event.clientX, y: event.clientY };
    const deltaPos: MousePosition = { x: event.deltaX, y: event.deltaY };
    const clickPos: MousePosition = {
      x: mousePos.x - deltaPos.x,
      y: mousePos.y - deltaPos.y,
    };
    const newOffset = getMoveOffset(clickPos, mousePos, state.rect, state.zoomLevel);
    if (newOffset) {
      state.rect.offsetX = newOffset.offsetX;
      state.rect.offsetY = newOffset.offsetY;
    }
    return state;
  }

  isExecutable(_: State, event: WheelEvent & { wheelDeltaY: number }): boolean {
    return isTrackpadMove(event) && !isDoubleTapForMac(event);
  }
}
