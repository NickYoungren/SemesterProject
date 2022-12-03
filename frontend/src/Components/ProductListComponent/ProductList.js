import React, {useState, useEffect} from "react";
import ProductDataService from "../../services/products"
import {Link} from "react-router-dom"

const ProductList = props => {
    const [product, setProducts] = useState([]);
    const [searchName, setSearchName ] = useState("");
    const [brands, setBrands] = useState(["All Brands"]);

    useEffect(() => {
        retrieveProducts();
        retrieveBrands();
    }, []);

    const retrieveProducts = () => {
        ProductDataService.getAll()
            .then(response => {
                console.log(response.data);
                setProducts(response.data.products)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveBrands = () => {
        ProductDataService.getBrands()
        .then(response => {
            console.log(response.data);
            setBrands(["All Brands"].concat(response.data));

        })
        .catch(e => {
            console.log(e);
        });
    }

    const refreshList = () => {
        retrieveProducts();
    }

    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                    />

                </div>
            </div>
            <div className="row">
                {product.map((product) => {
                    return(
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{product.Name}</h5>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductList;