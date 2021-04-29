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
    contactUsSuccess: {
        status: 'success',
        data: {
            message: {
                AR: 'تم ارسال رسالتك',
                EN: 'Your message has been sent'
            }
        }
    },
    genericError: {
        statusCode: 400,
        status: 'fail',
        data: {
            message: {
                AR: 'حدث خطأ ما يرجى المحاولة لاحقا',
                EN: 'Something went wrong, please try again later'
            }
        }
    },
    invalidName: {
        status: 'failed',
        data: {
            message: {
                AR: 'الاسم غير صحيح',
                EN: 'Invalid name'
            }
        }
    },
    successAddList: {
        status: 'success',
        data: {
            message: {
                AR: 'تم ارسال طلبك',
                EN: 'List successfully added'
            }
        }
    }
}