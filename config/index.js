module.exports = {
    port: process.env.PORT,
    apiProvider: {
        name: process.env.API_PROVIDER,
        apiKey: process.env.API_KEY,
        providerUrl: process.env.PROVIDER_URL,
        host: process.env.API_PROVIDER_HOST,
        useQueryString: process.env.API_PROVIDER_USE_API_KEY === 'true'
    },
    redisConnObj: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    setExpiresIn: {
        movieList: process.env.MOVIE_LIST_EXPIRES_IN
    }
}