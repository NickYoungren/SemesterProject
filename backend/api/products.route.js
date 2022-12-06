import express from "express"
import ProductsCtrl from "./products.controller.js"

const router = express.Router()


router.route("/").get(ProductsCtrl.apiGetProducts) //done converting
router.route("/id/:id").get(ProductsCtrl.apiGetRestaurantById)
router.route("/brands").get(ProductsCtrl.apiGetProductBrands)

export default router