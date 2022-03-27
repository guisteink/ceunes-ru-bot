export default function isPastDate(auxDate)
{
    if (_.isEmpty(auxDate)) return
    let dateNow = new Date().getTime()
    let date = new Date(auxDate).getTime()

    if (date > dateNow) return -1 // future
    if (date == dateNow) return 0 // present
    else return 1 //past
}