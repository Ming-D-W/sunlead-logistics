export function minToHM (minutes) {
  return (Math.floor(minutes / 60) + ':' + (minutes % 60) + '分')
}
