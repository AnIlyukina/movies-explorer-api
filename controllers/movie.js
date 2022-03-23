const {
  BadRequestError, ForbiddenError, NotFoundError,
} = require('../errors');

const Movie = require('../models/movie');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const movie = new Movie({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      thumbnail: req.body.thumbnail,
      // owner:
      // movieId:
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
    });
    res.status(201).send(await movie.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new ForbiddenError('Пользователь не найден');
    }
    if (!movie.owner.equals(userId)) {
      throw new ForbiddenError('Данный фильм нельзя удалить');
    }
    const isDeletedMovie = await Movie.findByIdAndDelete(movieId);
    if (isDeletedMovie) {
      res.status(200).send(movie);
    } else {
      throw new NotFoundError('Данный фильм не найден');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};