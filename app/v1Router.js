const express = require('express');
const router = express.Router();
const constants = require('../config/constant.json');
const BASE_URL_V1 = constants.BASE_URL + constants.V1;
const authToken = require('../middleware/authToken');

router.post(BASE_URL_V1 + '/getMovies',authToken.validateAuthToken, require('./api/getmovies').getMovies);
module.exports = router;