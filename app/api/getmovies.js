const requireHelper = require('../../helper/require-helper');
const safePromise = requireHelper.safePromise;
const reqValidation = require('../validation/getmovies');
const movieService = require('../../service/rapidApiService');
// const redisCache = require('../../helper/cache-helper');
const _ = requireHelper._;


let getVideoList = async (resultMovies) => {
  let response = [];
  if (resultMovies && resultMovies.d) {
    for (const movie of resultMovies.d) {
      let objMovie = {
        id: movie.id || '',
        name: movie.l || '',
        posterURL: movie.i && movie.i.imageUrl ? movie.i.imageUrl : ' NA',
        videos: []
      }
      if (movie.v) {
        let movieVidoes = {}
        for (const video of movie.v) {
          movieVidoes.id = video.id || '';
          movieVidoes.name = video.l || '';
          movieVidoes.duration = video.s || '';
          if (video.id && video.id.length > 0) {
            let playVideo = await movieService.getVideo(video.id);
            if (playVideo && playVideo.resource && playVideo.resource.encodings) {
              movieVidoes.encodings = playVideo.resource.encodings;
            } else {
              movieVidoes.encodings = [];
            }
          }
          objMovie.videos.push(movieVidoes);
        }
      }
      response.push(objMovie);
    }
    return response;
  }
}
/* getMovies API*/
let getMovies = async (req, res) => {
  try {
    let reqBody = req.body;
    /* check request body validation */
    let validationErrors = await reqValidation.validation(reqBody);
    if (validationErrors) {
      return res.status(400).send({
        success: false,
        message: validationErrors
      });
    }
    /* Get redis data */
    // const redisData = redisCache.getRedisData(reqBody.title);
    // if (!_.isNull(redisData)) {
    //   return res.status(200).send({
    //     status: 200,
    //     message: 'success',
    //     data: JSON.parse(redisData)
    //   });
    // }

    /* get movie details */
    const [errorMovie, resultMovies] = await safePromise(movieService.getMovieDetails(reqBody.title));
    if (errorMovie) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: 'Error occurred while getting movie details'
      });
    }
    /* get video list */
    if (resultMovies && resultMovies.d) {
      let [errorMovieList, resultMovieList] = await safePromise(getVideoList(resultMovies));
      if (errorMovieList) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: 'Error occurred while getting movie list' + errorMovieList,
          data: []
        });
      }

      return res.status(200).send({
        status: 200,
        success: true,
        message: 'success',
        data: resultMovieList
      });

      /* Set redis data */
      // if (!_.isNull(response) || !_.isEmpty(response)) {
      //   redisCache.setRedisData(reqBody.title, JSON.stringify(response));
      //   return res.status(200).send({
      //     status: 200,
      //     success: true,
      //     message: 'success',
      //     data: response
      //   });
      // } else {
      // return res.status(200).send({
      //   status: 200,
      //   success: true,
      //   data: response
      // });
      // }
    } else {
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Movie not found!',
        data: []
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      success: false,
      message: error
    });
  }
};
module.exports.getMovies = getMovies;
