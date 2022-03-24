const _ = require('lodash');
const moment = require('moment');
const botgram = require('../../integrations/telegram/bot');
const scrapper = require('../../integrations/web-scrapper/scrapper')

class Routine
{
    constructor()
    {
        this.botgram = botgram;
        this.scrapper = scrapper;
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