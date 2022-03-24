import { create } from 'axios';

const base = "https://api.telegram.org/bot"

const api = create({
    baseURL: base,
});

const sendMessage = async (data) =>
{
    return api.POST(`/#${process.env.TELEGRAM_TOKEN}/sendMessage`)
}

export default {
    sendMessage
}