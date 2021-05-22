let consts = require('../config/consts');
const validateAuthToken = (req, res, next) =>{
    if (req && req.headers && req.headers.authtoken) {
      let requestedToken = req.headers.authtoken;
      if (requestedToken === consts.authtoken) {
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