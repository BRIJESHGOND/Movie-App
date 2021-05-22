module.exports = {
    port: process.env.PORT,
    apiProvider: {
        name: 'rapidapi', // process.env.API_PROVIDER,
        apiKey: 'ac27120843mshc63fcbfdce42f56p10fa3bjsnaac6bebdae29', // process.env.API_KEY,
        providerUrl: 'https://imdb8.p.rapidapi.com', //process.env.PROVIDER_URL,
        host: 'imdb8.p.rapidapi.com', // process.env.API_PROVIDER_HOST,
        useQueryString: true //process.env.API_PROVIDER_USE_API_KEY === 'true'
    },
    redisConnObj: {
        host: 'localhost', // process.env.REDIS_HOST,
        port: '6379' // process.env.REDIS_PORT
    },
    redisCacheExpiresIn: {
        movieList: process.env.MOVIE_LIST_EXPIRES_IN
    }
}