const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const contactUsEmail = async (fullName, email, message) => {
    try {
        console.log(fullName, email, message);
        const data = {
            from: `Phoenix Support <mailgun@${DOMAIN}>`,
            to: "sirajmhanna@hotmail.com",
            subject: "Welcome To Phoenix",
            text: `Full name: ${fullName} \nMessage: ${message} \nEmail: ${email}`
        };
        const mgRes = await mg.messages().send(data);
        if (!mgRes || mgRes && mgRes.message !== "Queued. Thank you.") {
            logger.error(`Mailgun request returned an unexpected response: ${mgRes}`);
            return false;
        }
        return mgRes;
    } catch (error) {
        logger.error(`An error occurred: ${error}`);
        return false;
    }
};

module.exports = { contactUsEmail };