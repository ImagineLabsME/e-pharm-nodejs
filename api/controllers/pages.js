const response = require('../../constants/commonResponses');
const logger = require('../../config/winston');
const pages = require('../../pages.json');

exports.page = (req, res) => {
    try {
        logger.info(`server-side-rendering pages`);
        logger.info(`requested page_name: ${req.query.page_name} / requested language: ${req.query.lang}`);

        let data;
        switch (req.query.page_name) {
            case 'sidebar': data = req.query.lang === 'EN' ? pages.sidebar.EN : data = pages.sidebar.AR;
                break;
            case 'header': data = req.query.lang === 'EN' ? pages.header.EN : data = pages.header.AR;
                break;
            default:
                logger.info(`Response 204 -- No such page/content`);
                return res.status(204).json({
                    status: response.genericError.status,
                    data: {
                        message: response.genericError.data.message['AR']
                    }
                });
        }

        logger.info(`Response 200`);
        res.status(200).json(data);
    } catch (error) {
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
