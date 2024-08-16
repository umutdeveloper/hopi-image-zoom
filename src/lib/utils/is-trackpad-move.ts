const TRACKPAD_THRESHOLD = 10;
export function isTrackpadMove(e: WheelEvent & { wheelDeltaY: number }) {
  let isTrackpad = e.deltaY <= -1 || e.deltaY >= 1;
  if (
    isTrackpad &&
    (Math.floor(e.deltaY) !== e.deltaY || Math.abs(e.wheelDeltaY - e.deltaY * -3) > TRACKPAD_THRESHOLD)
  ) {
    isTrackpad = false;
  }
  return isTrackpad;
}
