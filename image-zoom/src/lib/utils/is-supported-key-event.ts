export function isSupportedKeyEvent(event: KeyboardEvent, keys: string[]) {
  return keys.includes(event.key);
}
