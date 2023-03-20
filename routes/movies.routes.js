const router = require("express").Router();
const Movie = require("../models/Movie.model");

/* GET all movies list */
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find({}).sort({title: 1});
    res.render("./movies/movies", {movies});
  } catch(error) {
    next(error);
  }
});

/* GET route to display add a movie form */
router.get("/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({}).sort({name: 1});
    res.render("./movies/new-movie", {celebrities});
  } catch(error) {
    next(error);
  }
});

/* POST route to create the movie from the form */
router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch(error) {
    next(error);
  }
});

/* GET movie details page */
router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId).populate("cast");
    res.render("./movies/movie-details", {movie});
  } catch(error) {
    next(error);
  }
});

/* POST route to delete movies */
router.post("/:movieId/delete", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    await Movie.findByIdAndRemove(movieId);
    res.redirect("/movies");
  } catch(error) {
    next(error);
  }
});

/* GET route to edit movie form */
router.get("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId).populate("cast");
    const celebrities = await Celebrity.find();
    res.render("./movies/edit-movie", { movie, celebrities });
  } catch(error) {
    next(error);
  }
});

/* POST route to send edited movie data to DB*/
router.post("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast});
    res.redirect(`/movies/${movieId}`);
  } catch(error) {
    next(error);
  }
});

module.exports = router;