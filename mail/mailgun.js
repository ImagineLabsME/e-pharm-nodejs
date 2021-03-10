const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const contactUsEmail = async (fullName, email, message) => {
    try {
        console.log(fullName, email, message);
        const data = {
            from: `${process.env.CONTACT_US_FROM}${DOMAIN}>`,
            to: "sirajmhanna@hotmail.com",
            subject: "E-pharm Contact Form Submitted",
            text: `Full name: ${fullName} \n\nMessage: ${message} \n\nEmail: ${email}`
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