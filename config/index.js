module.exports = {
    port: process.env.PORT,
    apiProvider: {
        name: 'rapidapi', // process.env.API_PROVIDER,
        apiKey: '41d4b0f86bmsha20289999c670abp1a3220jsn62a460e4c0fb', // process.env.API_KEY,
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