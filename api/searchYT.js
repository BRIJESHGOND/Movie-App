const commonFn = require('../commanFn');
const requireHelper = require('../helpers/require-helper');
const _ = requireHelper._;
const Joi = requireHelper.Joi;
const safePromise = requireHelper.safePromise;

const validation = (reqBody) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      searchMovie: Joi.string().min(1).max(1000).required()
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


/* Search API*/
let searchVideo = async (req, res) => {
  try {

    let reqBody = req.body;
    /* check validation */
    let validationErrors = await validation(reqBody);
    if(validationErrors){
      return res.status(400).send({
        success: false,
        message : validationErrors
      });
    }
    /* Fetch movie list*/
    const [error, result] = await safePromise(commonFn.callMovieApi(reqBody));
    if(error){
      return res.status(400).send({
        success : false,
        message: error
      });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      success : false,
      message : error
    });
  }
};
module.exports.searchVideo = searchVideo;
