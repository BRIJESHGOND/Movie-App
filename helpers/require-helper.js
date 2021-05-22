const Joi = require('@hapi/joi');
const _ = require('underscore');

const safePromise = promise => promise.then(data => ([null, data])).catch(err => ([err]));

module.exports.Joi = Joi;
module.exports._ = _;
module.exports.safePromise = safePromise;