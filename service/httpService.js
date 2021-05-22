const request = require('request');

const call = (httpMethod, url, headers = {}) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: httpMethod,
            url: url,
            headers: headers,
            json: true
        }
        request(options, function (error, response, body) {
            if (error) {
                return reject(error);
            } else {
                return resolve(body);
            }
        });
    });
};

module.exports.call = call;