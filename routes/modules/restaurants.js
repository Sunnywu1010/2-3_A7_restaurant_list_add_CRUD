const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/restaurants");

// get into new page
router.get("/new", (req, res) => {
  res.render("new");
});
// get into edit page
router.get("/:restaurants_id/edit", (req, res) => {
  const restaurantId = req.params.restaurants_id;
  restaurantList
    .findById(restaurantId)
    .lean()
    .then((restaurant) => {
      res.render("edit", { restaurant });
    })
    .catch((error) => console.log(error));
});
// delete
router.post("/:restaurants_id/delete", (req, res) => {
  const restaurantId = req.params.restaurants_id;
  restaurantList
    .findById(restaurantId)
    .then((restaurant) => {
      restaurant.remove();
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});
// save edit change
router.post("/:restaurants_id/edit", (req, res) => {
  const restaurantId = req.params.restaurants_id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  restaurantList
    .findById(restaurantId)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch((error) => console.log(error));
});
// params
router.get("/:restaurants_id", (req, res) => {
  const restaurantId = req.params.restaurants_id;
  restaurantList
    .findById(restaurantId)
    .lean()
    .then((restaurant) => {
      res.render("show", { restaurant });
    })
    .catch((error) => console.log(error));
});

// create restaurant
router.post("/", (req, res) => {
  restaurantList
    .create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
