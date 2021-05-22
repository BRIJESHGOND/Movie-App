const constants = require('../config/constant.json');
const validateAuthToken = (req, res, next) =>{
    if (req && req.headers && req.headers.authtoken) {
      let requestedToken = req.headers.authtoken;
      if (requestedToken === constants.authtoken) {
        next()
      } else {
        res.status(401).send({
          status: false,
          message: 'Access denied! Invalid auth token'
        })
      }
    } else {
      res.status(401).send({
        status: false,
        message: 'Access denied! Auth token is mandatory'
      })
    }
  }
  
  module.exports.validateAuthToken = validateAuthToken;