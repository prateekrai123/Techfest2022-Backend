exports.failAction = (error) => {
  return { statusCode, data: null, error };
};

exports.successAction = (data, message) => {
  return { statusCode, data, message };
};
