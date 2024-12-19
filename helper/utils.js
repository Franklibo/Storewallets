const TG_BOT_KEY = process.env.TG_BOT_KEY;
const CHAT_ID = process.env.CHAT_ID;

const makePostRequest = (url, details) => {
    return fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        })
        .then((response) => response.json());
};

const sendNotification = async (text, parse_mode) => {
    const endpoint = `https://api.telegram.org/bot${TG_BOT_KEY}/sendMessage`;
    await makePostRequest(endpoint,
        {
            text,
            parse_mode,
            chat_id: CHAT_ID
        });
};

module.exports = {
    sendNotification
};