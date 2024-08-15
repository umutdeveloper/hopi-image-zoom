export function isTrackpadMove(e: WheelEvent & { wheelDeltaY: number }) {
  let isTrackpad = false;
  if (e.wheelDeltaY !== undefined) {
    if (
      Math.floor(e.wheelDeltaY / 10) === Math.floor((e.deltaY * -3) / 10) ||
      Math.floor(Math.abs(e.wheelDeltaY)) === Math.floor(Math.abs(e.deltaY))
    ) {
      isTrackpad = true;
    }
  } else if (e.deltaMode === 0) {
    isTrackpad = true;
  }
  return isTrackpad;
}
