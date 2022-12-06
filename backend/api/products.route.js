import express from "express"
import ProductsCtrl from "./products.controller.js"
import AuthDAO from "../dao/authDAO.js"


const router = express.Router()


router.route("/").get(ProductsCtrl.apiGetProducts) //done converting
router.route("/id/:id").get(ProductsCtrl.apiGetRestaurantById)
router.route("/brands").get(ProductsCtrl.apiGetProductBrands)
router.route("/signup").post(AuthDAO.signup)
router.route("/signin").post(AuthDAO.signin)

export default router