const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/restaurants");

// search
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  // find()
  restaurantList
    // $or: find name or category
    // $regex: any target matches "keyword"
    // $options:"$i": Case insensitivity to match upper and lower cases
    .find({
      $or: [
        { name: { $regex: keyword, $options: "$i" } },
        { category: { $regex: keyword, $options: "$i" } },
      ],
    })
    .lean()
    .then((restaurants) => {
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
