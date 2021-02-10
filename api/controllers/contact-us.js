const mailgun = require('../../mail/mailgun');
const response = require('../../constants/commonResponses');
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
            status: 'Server Error',
            data: {
                errorType: 'SERVER_ERROR',
                errorMessage: 'حدث خطأ في الخادم، الرجاء المحاولة لاحقاً',
            }
        });
    }
}