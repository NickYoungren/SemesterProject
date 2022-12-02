import { ObjectId } from "mongodb"

let products

export default class ProductsDAO {
    static async injectDB(conn) {
        if (products) {
            return
        }
        try {
            products = await conn.db(process.env.PRODUCTS_NS).collection("product_info")
        } 
        catch(e) {
            console.error(`Unable to establish a collection handle in productsDAO: ${e}`)
        }
    }

    static async getProducts({
        filters = null,
        page = 0,
        productsPerPage = 10,
    } = {}) {
        let query
        if (filters){
            if("Name" in filters){
                query = {$text: {$search: filters["Name"]}}
            }
            else if("Brand" in filters) {
                query = {"Brand": {$eq: filters["Brand"]}}
            }
        }

        let cursor

        try{
            cursor = await products
                .find(query)
        }
        catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return { productsList: [], totalNumProducts: 0}
        }

        const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page)

        try {
            const productsList = await displayCursor.toArray()
            const totalNumProducts = await products.countDocuments(query)
            return { productsList, totalNumProducts}
        }
        catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { productsList: [], totalNumProducts: 0}
        }
    }
    static async getRestaurantById(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                    {
                        $lookup: {
                            from: "reviews",
                            let: {
                                id: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$restaurant_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "reviews",
                        },
                    },
                    {
                        $addFields: {
                            reviews: "$reviews",
                        },
                    },
            ]
            return await restaurants.aggregate(pipeline).next()
        }
        catch(e){
            console.error(`Something went wrong in getRestaurantsByID: ${e}`)
            throw e
        }
    }
    static async getCuisines(){
        let cuisines = []
        try{
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        }
        catch(e){
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines
        }
    }
}