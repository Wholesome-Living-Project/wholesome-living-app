export const formatTimeMeditation = (time: number) => {
    let hours = String(Math.trunc(time / 60)).padStart(2, '0')
    let minutes = String(time % 60).padStart(2, '0')

    let result = hours !== "00" ? `${hours} h ${minutes} min` : `${minutes} min`
    return result
}

