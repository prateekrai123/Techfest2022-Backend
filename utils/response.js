exports.failAction = (error = 'Fail', statusCode = 400) => {
    return ({ statusCode, data: null, error });
}

exports.successAction = ( data, message = 'Success', statusCode = 200) => {
    return ({ statusCode, data, message });
}