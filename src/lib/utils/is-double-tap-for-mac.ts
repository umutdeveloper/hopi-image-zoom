import { MousePosition } from '../states/state';

type UserAgentData = { platform: string };
function isPlatformMac() {
  const platform =
    navigator.platform || (navigator as unknown as { userAgentData: UserAgentData }).userAgentData.platform;
  return platform.toLowerCase().indexOf('mac') > -1;
}

export function isDoubleTapForMac(event: WheelEvent) {
  const deltaPos: MousePosition = { x: event.deltaX, y: event.deltaY };
  return isPlatformMac() && deltaPos.x === 0 && deltaPos.y === 0;
}
