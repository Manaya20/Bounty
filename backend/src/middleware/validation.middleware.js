const { validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));

    return res.status(422).json({
      status: 'fail',
      message: 'Validation failed',
      errors: extractedErrors
    });
  };
};

// Explicitly export as a function
module.exports = validate;