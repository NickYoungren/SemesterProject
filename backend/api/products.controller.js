import ProductsDAO from "../dao/productsDAO.js"

export default class ProductsController {
    
    //obtains a page worth of products from a colleciton in the database
    static async apiGetProducts(req, res, next){
        const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 10        //default product page will include 10 items
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
    static async apiGetProductBrands(req, res, next){
        try{
            let brands = await ProductsDAO.getBrands()
            res.json(brands)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}
