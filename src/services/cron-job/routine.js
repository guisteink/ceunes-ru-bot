const _ = require('lodash');
const moment = require('moment');

class Routine
{
    constructor()
    {
    }

    sendMessageToTelegram()
    {

    }

    deleteAllDayMessages()
    {

    }

    isPastDate(auxDate)
    {
        if (_.isEmpty(auxDate)) return
        let dateNow = new Date().getTime()
        let date = new Date(auxDate).getTime()

        if (date > dateNow) return -1 // future
        if (date == dateNow) return 0 // present
        else return 1 //past
    }

    howMuchTime(start, end, typeTime)
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
}

module.exports = new Routine();