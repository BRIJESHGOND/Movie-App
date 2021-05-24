# Movie-App






API Endpoint : movieapp/v1/getMovies

authtoken : n3GW3$8&@Jm3Ybj^U8K5

RequestBody : 
{
    "title":"advencher"
}


To start app please follow below commands

 * npm install
 * npm start
 * Postman Collection : https://www.postman.com/collections/9d87c4ba0adb282774e0

# Sample .env File
> PORT = 3000
> NODE_ENV = Dev
> API_PROVIDER = rapidapi
> REDIS_PORT = 6379
> REDIS_HOST = 127.0.0.1
> MOVIE_LIST_EXPIRES_IN = 10
> API_KEY = 41d4b0f86bmsha20289999c670abp1a3220jsn62a460e4c0fb
> PROVIDER_URL = https://imdb8.p.rapidapi.com
> API_PROVIDER_HOST = imdb8.p.rapidapi.com
> API_PROVIDER_USE_API_KEY = true

Please note that in order to start this app you will require a ***'.env'_** file in the root folder of app
.env


## Folder structure
* app
    * api 
      * getmovies.js
      * validation ->getmovies.js
      * v1Router.js
* config
     * constant.json
     * index.js
* helper
     * cache-helper.js
     * require-helper.js
* middleware
     * authToken.js
* node_modules
* public
* service
    * httpService.js
    * rapidApiService.js
* app.js
* package.json
