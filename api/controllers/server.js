const response = require('../../constants/commonResponses');
const logger = require('../../config/winston');

exports.healthCheck = (req, res) => {
    const requestId = new Date().getTime() + "" + Math.floor(Math.random() * Math.floor(999999));
    const LogBase = `${requestId} :: server.healthCheck`;
    try {
        logger.info(`${LogBase} :: Beginning`);
        logger.debug(`${LogBase} :: Request Details: ${JSON.stringify({
            sourceIP: req.ip
        }, null, 2)}`)
        
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Server is alive'
            }
        });
    } catch (error) {
        logger.error(`${LogBase} :: Error thrown. Details: ${error}`);
        logger.error({
            error,
            ip: req.ip,
            baseURL: req.baseUrl,
            originalURL: req.originalUrl,
            protocol: req.protocol,
            route: req.route,
            subdomains: req.subdomains
        });
        res.status(500).json({
            status: response.serverError.status,
            data: {
                errorType: response.serverError.data.errorType,
                errorMessage: response.serverError.data.message['AR'],
            }
        });
    }
}
