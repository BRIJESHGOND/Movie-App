const config = require('../config/');
const redis = require("redis");
const client = redis.createClient(config.redisConnObj);
const redisExpires = config.setExpiresIn;


const {
    promisify
} = require("util");

client.on("error", function (error) {
    console.error('error', error);
});


const getRedisData = (reqKey) => {
    const getCacheData = promisify(client.get).bind(client);
    return getCacheData(reqKey);
}

const setRedisData = (reqKey, movieData) => {
    return client.setex(reqKey, redisExpires.movieList, JSON.stringify(movieData));
}



module.exports = {
    getRedisData: getRedisData,
    setRedisData: setRedisData
}