const response = require('../../constants/commonResponses');
const logger = require('../../config/winston');
const pages = require('../../pages.json');

exports.page = (req, res) => {
    try {
        logger.info(`server-side-rendering pages`);
        logger.info(`requested page_name: ${req.query.page_name} / requested language: ${req.query.lang}`);

        let data;
        switch (req.query.page_name) {
            case 'home': data = req.query.lang === 'EN' ? pages.home.EN : pages.home.AR;
                break;
            case 'sidebar': data = req.query.lang === 'EN' ? pages.sidebar.EN : pages.sidebar.AR;
                break;
            case 'header': data = req.query.lang === 'EN' ? pages.header.EN : pages.header.AR;
                break;
            case 'contact': data = req.query.lang === 'EN' ? pages.contact.EN : pages.contact.AR;
                break;
            case 'viewListings': data = req.query.lang === 'EN' ? pages.viewListings.EN : pages.viewListings.AR;
                break;
            case 'addListing': data = req.query.lang === 'EN' ? pages.addListings.EN : pages.addListings.AR;
                break;
                case 'notFound': data = req.query.lang === 'EN' ? pages.notFound.EN : pages.notFound.AR;
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
