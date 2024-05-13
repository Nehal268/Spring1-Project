// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/recipeSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken);

// SSR
// End1: Route to render index.html with recipes using EJS
router.get("/", blogSSR.renderRecipes);
// End2: Define a route to render the addrecipe.ejs view
router.get("/addrecipe", blogSSR.renderForm);
// End3:Route to add  recipe using EJ
router.post("/addrecipe", blogSSR.addRecipe);
// Define a route to render the singlerecipe.ejs view
router.get("/single-recipe/:id", blogSSR.renderRecipe);
// Define a route to delete singlerecipe
router.delete("/single-recipe/:id", blogSSR.deleteRecipe);
// Define a route to update single recipe.ejs
router.put("/single-recipe/:id", blogSSR.updateRecipe);
// Define recipe to update
router.get("/single-recipe/update/:id", blogSSR.renderUpdateRecipe);

module.exports = router;