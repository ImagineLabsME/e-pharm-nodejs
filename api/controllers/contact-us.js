const mailgun = require('../../mail/mailgun');
const response = require('../../constants/commonResponses');
/**
 * Contact us route POST /api/contact
 * @param { Object } 
 */
exports.contactMessage = async (req, res) => {
    try {
        const email = await mailgun.contactUsEmail(req.body.fullName, req.body.email, req.body.message);
        if (!email) {
            res.status(503).json({
                status: response.genericError.status,
                data: {
                    message: response.genericError.data.message[AR]
                },
                jwt: req.refreshToken
            });
        }
        res.status(200).json({
            status: response.contactUsSuccess.status,
            message: response.contactUsSuccess.data.message['AR']
        });
    } catch (error) {
        res.status(500).json({
            status: response.serverError.status,
            data: {
                errorType: response.serverError.data.errorType,
                errorMessage: response.serverError.data.message['AR'],
            }
        });
    }
}
