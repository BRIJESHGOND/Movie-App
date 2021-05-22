const requireHelper = require('../../helper/require-helper');
const _ = requireHelper._;
const Joi = requireHelper.Joi;

const validation = (reqBody) => {
    return new Promise((resolve, reject) => {
      const schema = Joi.object().keys({
        title: Joi.string().min(1).max(1000).required()
      });
      Joi.validate(reqBody, schema, (err, value) => {
        if (err) {
          let error = err.details.message;
          if (_.isArray(err.details) && err.details.length > 0) {
            error = err.details[0].message;
          }
          return resolve(error);
        }
        return resolve();
      });
    });
  };

  module.exports.validation = validation;