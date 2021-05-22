
let HttpService = require('./httpService');
let config = require('../config/index');
let constant = require('../config/constant.json');


const callRapidAPI = (url, httpMethod) => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-rapidapi-key': config.apiProvider.apiKey,
            'x-rapidapi-host': config.apiProvider.host,
            useQueryString: config.apiProvider.useQueryString
        }
        HttpService.call(httpMethod, url, headers)
            .then(function (data) {
                return resolve(data);
            })
            .catch(function (error) {
                console.log('error1111->', error)
                return reject(error);
            });
    });
};

const getMovieDetails = (title) => {
    return new Promise((resolve, reject) => {
        let endPoint = config.apiProvider.providerUrl + constant.API.getMovieDetails + '?q=' + encodeURIComponent(title);
        console.log('endPoint-->', endPoint);
        callRapidAPI(endPoint, 'GET')
            .then(function (data) {
                return resolve(data);
            })
            .catch(function (error) {
                return reject(error);
            });
    });
};

const getVideo = (videoID) => {
    return new Promise((resolve, reject) => {
        let endPoint = config.apiProvider.providerUrl + constant.API.getVid + '?viconst=' + encodeURIComponent(videoID) + '&region=US'
        callRapidAPI(endPoint, 'GET')
            .then(function (data) {
                return resolve(data);
            })
            .catch(function (error) {
                return reject(error);
            });
    });
};

module.exports = {
    callRapidAPI: callRapidAPI,
    getMovieDetails: getMovieDetails,
    getVideo: getVideo
}
