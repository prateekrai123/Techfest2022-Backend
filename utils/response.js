exports.failAction = (error = 'Fail', statusCode = 400) => {
    return ({ statusCode, data: null, error });
}