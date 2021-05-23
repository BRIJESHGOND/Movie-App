const requireHelper = require('../../helper/require-helper');
const safePromise = requireHelper.safePromise;
const reqValidation = require('../validation/getmovies');
const movieService = require('../../service/rapidApiService');
const redisCache = require('../../helper/cache-helper');
const _ = requireHelper._;

/* getMovies API*/
let getMovies = async (req, res) => {
  try {

    let reqBody = req.body;
    /* check validation */
    let validationErrors = await reqValidation.validation(reqBody);
    if (validationErrors) {
      return res.status(400).send({
        success: false,
        message: validationErrors
      });
    }

    /* Get redis data */
    const redisData = redisCache.getRedisData(reqBody.title);
    if (!_.isNull(redisData)) {
      return res.status(200).send({
        status: 200,
        message: 'success',
        data: JSON.parse(redisData)
      });
    }

    /* get movie details*/
    const [errorMovie, resultMovies] = await safePromise(movieService.getMovieDetails(reqBody.title));
    if (errorMovie) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: errorMovie
      });
    }
    let response = [];
    if (resultMovies && resultMovies.d) {
      for (const movie of resultMovies.d) {
        let m = {
          id: movie.id ? movie.id : '',
          name: movie.l ? movie.l : '',
          posterURL: movie.i && movie.i.imageUrl ? movie.i.imageUrl : ' NA',
          videos: []
        }
        if (movie.v) {
          let movieVidoes = {}
          for (const video of movie.v) {
            movieVidoes.id = video.id ? video.id : '';
            movieVidoes.name = video.l ? video.l : '';
            movieVidoes.duration = video.s ? video.s : '';
            if (video.id && video.id.length > 0) {
              let playURL = await movieService.getVideo(video.id);
              if (playURL && playURL.resource && playURL.resource.encodings) {
                movieVidoes.encodings = playURL.resource.encodings;
              } else {
                movieVidoes.encodings = [];
              }
            }
            m.videos.push(movieVidoes);
          }
        }
        response.push(m);
      }

      /* Set redis data */
      if (!_.isNull(response) || !_.isEmpty(response)) {
        redisCache.setRedisData(reqBody.title, '', JSON.stringify(response));
        return res.status(200).send({
          status: 200,
          success: true,
          message: 'success',
          data: response
        });
      } else {
        return res.status(200).send({
          status: 200,
          success: true,
          message: 'No Movie Found',
          data: []
        });
      }
    } else {
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'No Movie Found',
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
