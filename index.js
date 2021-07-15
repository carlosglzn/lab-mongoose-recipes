const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    /*
    Recipe.create(recipeExample, (error, newRecipe) => {
      if (error) {
        console.log('An error happened:', error);
        return;
      }
      console.log('The recipe is saved and its value is: ', newRecipe);
    }) */

    Recipe.insertMany(data, (error, newRecipeArr) => {
      if (error) {
        console.log('An error happened: ', error);
        return;
      }
      newRecipeArr.forEach(element => {
        console.log(element.title);
      })
    })

    Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"}, {duration: 100})
      .then(() => console.log("Rigatoni duration updated"))


    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("Carrot Cake recipe deleted"))
      .then(() => mongoose.disconnect())


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  const recipeExample = {
    "title": "Orange and Milk-Braised Pork Carnitas",
    "level": "UltraPro Chef",
    "ingredients": [
      "3 1/2 pounds boneless pork shoulder, cut into large pieces",
      "1 tablespoon freshly ground black pepper",
      "1 tablespoon kosher salt, or more to taste",
      "2 tablespoons vegetable oil",
      "2 bay leaves",
      "2 teaspoons ground cumin",
      "1 teaspoon dried oregano",
      "1/4 teaspoon cayenne pepper",
      "1 orange, juiced and zested"
    ],
    "cuisine": "American",
    "dishType": "main_course",
    "image": "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
    "duration": 160,
    "creator": "Chef John"
  }
