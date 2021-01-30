const response = require('../../constants/commonResponses');
const List = require('../models/List');
const nameCheck = require('../../utils/name-check');

/**
 * View listings route GET /api/listing/view
 * @param { Number } paginate
 * @returns { Object } list 
 */
exports.viewLists = async (req, res) => {
    try {
        const userRegex = new RegExp(req.query.search_value, 'i')
        const list = await List.find({ medication_name: userRegex }).limit(Number(req.query.paginate));
        if (!list) {
            res.status(401).json({
                status: 'fail',
                data: {
                    message: 'حدث خطأ ما يرجى المحاولة لاحقا'
                }
            })
        }
        res.status(200).json({
            status: 'success',
            data: list
        })
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
exports.addLists = async (req, res) => {
    try {
        if (!nameCheck(req.body.name)) {
            return res.status(201).json({
                status: 'fail',
                data: {
                    message: 'Please enter a valid name'
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
        await list.save();
        res.status(201).json({
            status: 'success',
            data: {
                message: 'Your request has been sent successfully.'
            }
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