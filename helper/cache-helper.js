const config = require('../config/index');
const redis = require("redis");
const client = redis.createClient(config.redisConnObj);
const {
    promisify
} = require("util");

client.on("error", function (error) {
    console.error(error);
});


const getRedisData = (reqBody) => {
    const getCacheData = promisify(client.get).bind(client);
    return getCacheData(reqBody.title);
}

const setRedisData = (reqBody, movieData) => {
    return client.setex(reqBody.title, config.redisCacheExpiresIn.movieList, JSON.stringify(movieData));
}



module.exports = {
    getRedisData: getRedisData,
    setRedisData: setRedisData
}