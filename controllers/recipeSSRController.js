const Recipe = require("../models/recipeModel");

// Render Controller: Render index.html with recipes using EJS
const renderRecipes = async (req, res) => {
  const user_id = req.user._id;
  try {
    const recipes = await Recipe.find({ createdBy: user_id }).sort({ createdAt: -1 });
    res.render("index", { recipes }); // Render index.ejs with recipes data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Recipe by ID
const renderRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const recipe = await Recipe.findOne({ _id: id, createdBy: user_id });
    if (!recipe) {
      return res.render("notfound");
    }
    res.render("singlerecipe", { recipe }); // Render singlerecipe.ejs with recipe data
  } catch (error) {
    console.error("Error rendering Recipe:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addrecipe"); // Assuming "addrecipe.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// // Controller function to handle adding a new recipe (used for rendering and API)
// const addRecipe = async (req, res) => {
//   try {
//     const { title, description, ingredients, instructions, imageUrl } = req.body;
//     const createdBy = req.user._id;
//     const newRecipe = new Recipe({ title, description, ingredients, instructions, imageUrl, createdBy });
//     await newRecipe.save();
//     console.log("Recipe added successfully");
//     res.redirect("/"); // Adjust the URL as needed
//   } catch (error) {
//     console.error("Error adding recipe:", error);
//     res.status(500).render("error");
//   }
// };
const addRecipe = async (req, res) => {
  try {
    const { title, description, instructions, imageUrl } = req.body;
    const ingredients = req.body.ingredients.split('\n'); // Split ingredients by newline character
    const createdBy = req.user._id;
    const newRecipe = new Recipe({ title, description, ingredients, instructions, imageUrl, createdBy });
    await newRecipe.save();
    console.log("Recipe added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).render("error");
  }
};

// Delete Recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const recipe = await Recipe.findOneAndDelete({ _id: id, createdBy: user_id });
    if (!recipe) {
      return res.status(404).render("notfound");
    }
    console.log("Recipe deleted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleting Recipe:", error);
    res.status(500).render("error");
  }
};

// Update Recipe by ID
const renderUpdateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.render("notfound");
    }
    res.render("updaterecipe", { recipe });
  } catch (error) {
    console.error("Error fetching Recipe:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, imageUrl } = req.body;
    const updatedRecipeData = { title, description, ingredients, instructions, imageUrl };
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedRecipeData, { new: true });
    if (!updatedRecipe) {
      return res.render("notfound");
    }
    console.log("Recipe updated successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error updating Recipe:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderRecipes,
  renderRecipe,
  addRecipe,
  renderForm,
  deleteRecipe,
  updateRecipe,
  renderUpdateRecipe,
};