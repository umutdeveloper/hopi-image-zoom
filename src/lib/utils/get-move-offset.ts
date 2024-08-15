import { ElementRect, MousePosition } from '../states/state';

export function getMoveOffset(clickPosition: MousePosition, position: MousePosition, rect: ElementRect, zoom: number) {
  // Calculate started mouse pointer position
  const x = Math.max(position.x - rect.left, 0);
  const y = Math.max(position.y - rect.top, 0);

  // Add offset and current zoom level to find real mouse position.
  const mouseX = (x - rect.offsetX) / zoom;
  const mouseY = (y - rect.offsetY) / zoom;

  // Find the rendered rect dimensions
  const rectZoomWidth = rect.width * zoom;
  const rectZoomHeight = rect.height * zoom;

  // Calculate the new mouse pointer position
  const newX = Math.max(clickPosition.x - rect.left, 0);
  const newY = Math.max(clickPosition.y - rect.top, 0);

  // Add offset and current zoom level to find real new mouse position.
  const newMouseX = (newX - rect.offsetX) / zoom;
  const newMouseY = (newY - rect.offsetY) / zoom;

  // Find the difference between old and new position
  const diffX = (mouseX - newMouseX) * zoom;
  const diffY = (mouseY - newMouseY) * zoom;

  if (newMouseX !== mouseX || newMouseY !== mouseY) {
    // Move image in the new position
    const offsetX = Math.min(Math.max(rect.offsetX - diffX, rect.width - rectZoomWidth), 0);
    const offsetY = Math.min(Math.max(rect.offsetY - diffY, rect.height - rectZoomHeight), 0);

    return { offsetX, offsetY };
  }
  return;
}
