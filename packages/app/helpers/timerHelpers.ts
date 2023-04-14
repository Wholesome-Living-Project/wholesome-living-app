const padToTwo = (number) => (number <= 9 ? `0${number}` : number)
export const displayTime = (seconds: number) => {
  let minutes = 0
  if (seconds < 0) {
    seconds = 0
  }
  if (seconds < 60) {
    return `00:${padToTwo(seconds)}`
  }
  let remainCentiseconds = seconds % 60
  minutes = (seconds - remainCentiseconds) / 60
  if (minutes < 60) {
    return `${padToTwo(minutes)}:${padToTwo(remainCentiseconds)}`
  }
  let remainSeconds = minutes % 60
  return `${padToTwo(remainSeconds)}:${padToTwo(remainCentiseconds)}`
}
