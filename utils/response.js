exports.failAction = (error = "Fail") => {
  return { statusCode, data: null, error };
};

exports.successAction = (data, message = "Success") => {
  return { statusCode, data, message };
};
