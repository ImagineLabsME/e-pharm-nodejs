const response = require('../../constants/commonResponses');
const logger = require('../../config/winston');
const List = require('../models/List');
const nameCheck = require('../../utils/name-check');

/**
 * View listings route GET /api/listing/view
 * @param { Number } paginate
 * @returns { Object } list 
 */
exports.viewLists = async (req, res) => {
    try {
        logger.info(`View lists controller`);

        const userRegex = new RegExp(req.query.search_value, 'i')
        logger.info(`Fetching lists`);
        const list = await List.find({ medication_name: userRegex }).limit(Number(req.query.paginate)).sort({ 'createdAt': 'desc' });
        
        logger.info(`Fetching all.lists.length`);
        const length = await List.count({});
        
        if (!list || !length) {
            !list ? logger.warn(`list error`) : logger.warn(`length error`);
            res.status(503).json({
                status: response.genericError.status,
                data: {
                    message: response.genericError.data.message['AR']
                }
            })
        }
        
        logger.info(`Response 200 -- list`);
        res.status(200).json({
            status: 'success',
            length,
            data: list
        })
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
/**
 * Add list route POST /api/listing/add
 * @param { Object } 
 */
exports.addListing = async (req, res) => {
    try {
        logger.info(`Add list controller`);
        logger.info(`Checking if name is valid`);
        if (!nameCheck(req.body.name)) {
            logger.warn(`Invalid name ${req.body.name}`);
            return res.status(415).json({
                status: response.invalidName.status,
                data: {
                    message: response.invalidName.data.message['AR']
                }
            });
        }
        const list = new List({
            name: req.body.name,
            phone: req.body.phone,
            location: req.body.location,
            medication_name: req.body.medication_name,
            quantity: req.body.quantity,
            needed_by: req.body.needed_by
        });
        logger.info(`Adding list`);
        await list.save();
        logger.info(`Response 201 -- added successfully`);
        res.status(201).json({
            status: response.successAddList.status,
            data: {
                message: response.successAddList.data.message['AR']
            }
        });
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