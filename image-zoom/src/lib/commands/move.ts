import { MousePosition, State } from '../states/state';
import { getMoveOffset } from '../utils/get-move-offset';
import { AbstractCommand } from './command';

export class MoveCommand extends AbstractCommand {
  execute(state: State, event: MouseEvent): State {
    event.preventDefault();
    event.stopPropagation();
    const clickPos: MousePosition = { x: event.clientX, y: event.clientY };
    const newOffset = getMoveOffset(clickPos, state.mousePosition as MousePosition, state.rect, state.zoomLevel);
    if (newOffset && state.mousePosition) {
      state.rect.offsetX = newOffset.offsetX;
      state.rect.offsetY = newOffset.offsetY;
      state.mousePosition.x = clickPos.x;
      state.mousePosition.y = clickPos.y;
    }
    return state;
  }
}
