let request = require('request')

module.exports = {
    callMovieApi: (searchMovie) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                qs: { s: searchMovie, page: '1', r: 'json' },
                headers: {
                    'x-rapidapi-key': '41d4b0f86bmsha20289999c670abp1a3220jsn62a460e4c0fb',
                    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                    useQueryString: true
                }
            };
            // Dummy response
            // let params = {
            //     "Search": [
            //         {
            //             "Title": "Avengers: Endgame",
            //             "Year": "2019",
            //             "imdbID": "tt4154796",
            //             "Type": "movie",
            //             "Poster": "https://m.media-amazon.com/images/M/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg"
            //         }
            //     ],
            //     "totalResults": "1",
            //     "Response": "True"
            // };
            // return resolve(params);



            // Dummay error
            let error = {
                'success': false,
                'message': 'Error occurred while getting movie'
            }
            return reject(error);


            // request(options, function (error, response, body) {
            //     if (error) { return reject(error); }
            //     return resolve(body);
            // });
        });
    }
};