import { ElementRect, MousePosition } from '../states/state';

export function getZoomOffset(clickPosition: MousePosition, newZoom: number, rect: ElementRect, zoom: number) {
  // Calculate mouse pointer position
  const x = Math.max(clickPosition.x - rect.left, 0);
  const y = Math.max(clickPosition.y - rect.top, 0);

  // Add offset and current zoom level to find real mouse position.
  const mouseX = (x - rect.offsetX) / zoom;
  const mouseY = (y - rect.offsetY) / zoom;

  // Find the relative mouse position
  const xRatio = mouseX / rect.width;
  const yRatio = mouseY / rect.height;

  // Find the new rect dimensions
  const rectZoomWidth = rect.width * newZoom;
  const rectZoomHeight = rect.height * newZoom;

  // Find the new relative mouse position
  const newMouseX = xRatio * rectZoomWidth;
  const newMouseY = yRatio * rectZoomHeight;

  // Show image in the same position
  const offsetX = Math.min(Math.max(x - newMouseX, rect.width - rectZoomWidth), 0);
  const offsetY = Math.min(Math.max(y - newMouseY, rect.height - rectZoomHeight), 0);

  return { offsetX, offsetY };
}
