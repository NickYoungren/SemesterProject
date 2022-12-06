import express from "express"
import ProductsCtrl from "./products.controller.js"
import AuthDAO from "../dao/authDAO.js"


const router = express.Router()


router.route("/").get(ProductsCtrl.apiGetProducts)              //done converting
router.route("/brands").get(ProductsCtrl.apiGetProductBrands)
router.route("/signup").post(AuthDAO.signup)                   //authorization controller became redundant so we switched to using the DAO directly
router.route("/signin").post(AuthDAO.signin)

export default router
