import ProductsDAO from "../dao/restaurantsDAO.js"

export default class ProductsController {
    static async apiGetProducts(req, res, next){
        const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 10
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.Brand) {
            filters.Brand = req.query.Brand
        }
        else if (req.query.Name){
            filters.Name = req.query.Name
        }

        const{productsList, totalNumProducts} = await ProductsDAO.getProducts({
            filters,
            page,
            productsPerPage,
        })

        let response = {
            products: productsList,
            page: page,
            filters: filters,
            entries_per_page: productsPerPage,
            total_results: totalNumProducts,
        }
        res.json(response)
    }
    static async apiGetRestaurantById(req, res, next){
        try{
            let id = req.params.id || {}
            let restaurant = await ProductsDAO.apiGetRestaurantById(id)
            if(!restaurant){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(restaurant)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
    static async apiGetRestaurantCuisines(req, res, next){
        try{
            let cuisines = await ProductsDAO.getCuisines()
            res.json(cuisines)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}