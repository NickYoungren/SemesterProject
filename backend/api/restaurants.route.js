import express from "express"
import ProductsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./review.controller.js"

const router = express.Router()

router.route("/").get(ProductsCtrl.apiGetProducts) //done converting
router.route("/id/:id").get(ProductsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(ProductsCtrl.apiGetRestaurantCuisines)

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router