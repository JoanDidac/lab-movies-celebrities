const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

/* GET route to display all celebrities */
router.get("/", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({}).sort({name: 1});
    res.render("/celebrities/celebrities", {celebrities});
  } catch(error) {
    next(error);
  }
});

/* GET route form to create celebrity */
router.post('/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });

  newCelebrity.save((err) => {
    if (err) {
      console.log(err);
      res.render('celebrities/new-celebrity');
    } else {
      res.redirect('/celebrities');
    }
  });
});


/* POST route to create celebrity from form */
router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch {
    res.redirect("/celebrities/new-celebrity");
  }
});

/* additional POST route to delete celebrity */
router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndRemove(id);
    res.redirect("/celebrities");
  } catch(error) {
    next(error);
  }
});

module.exports = router;