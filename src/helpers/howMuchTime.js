export default function functionhowMuchTime(start, end, typeTime)
{
    let distance = end - start;
    switch (typeTime) {
        case 'second':
            return Math.floor((distance % (1000 * 60)) / 1000)
            break;

        default:
            return console.log("Error")
            break;
    }
}