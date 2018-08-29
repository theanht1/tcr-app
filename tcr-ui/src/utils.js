export function createSalt() {
  const length = 66;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

export function toMinuteAndSecond(seconds) {
  let minutes = Math.floor(seconds / 60).toString();
  let remainingSeconds = (seconds % 60).toString();
  if (minutes.length === 1) minutes = '0' + minutes;
  if (remainingSeconds.length === 1) remainingSeconds = '0' + remainingSeconds;
  return `${minutes}:${remainingSeconds}`;
}