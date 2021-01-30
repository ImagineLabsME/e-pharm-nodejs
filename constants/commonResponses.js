module.exports = {
    serverError: {
        statusCode: 500,
        status: 'fail',
        data: {
            errorType: 'SERVER_ERROR',
            message: {
                AR: "حدث خطأ في الخادم، الرجاء المحاولة لاحقاً",
                EN: "There was a server error, please try again later"
            }
        }
    },
}