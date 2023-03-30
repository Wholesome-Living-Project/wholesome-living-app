// @ts-ignore
export const getFormattedTimer = (time: number | undefined) => {
  if (!time) return '00:00'

  const hours = Math.floor(time / 60)
  const minutes = time % 60

  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}
