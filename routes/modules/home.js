const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/restaurants");

// search
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  // find()
  restaurantList
    .find({ $or: [{ name: keyword }, { category: keyword }] })
    .lean()
    .then((restaurants) => {
      console.log(restaurants);
      res.render("index", { restaurants, keyword });
    });
});
// filter()
// restaurantList
// .find()
// .lean()
// .then((restaurants) => {
//   const restaurantsSearch = restaurants.filter(
//     (restaurant) =>
//     restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
//     restaurant.category.toLowerCase().includes(keyword.toLowerCase())
//     );
//     res.render("index", { restaurants: restaurantsSearch, keyword });
//   })
// });

router.get("/", (req, res) => {
  restaurantList
    .find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
module.exports = router;
