import React, { useState, useEffect } from "react";
import TabNavItem from "../V2/TabNavItem";
import TabContent from "../V2/TabContent";
import ProductComparison from "../CompareComponent/Comparison";
import SearchBar from "../SearchBarComponent/SearchBar";
import HomePage from "../HomePageComponent/HomePage";
import { products } from "../../data/data";
import ProductList from "../ProductListComponent/ProductList";
import ProductDataService from "../../services/products";
import Login from "../LoginComponent/Login";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [product, setProducts] = useState([]);

    useEffect(() => {
        retrieveProducts();
    }, []);

    const retrieveProducts = () => {
        ProductDataService.getAll()
            .then(response => {
                console.log(response.data.products);
                const product = (response.data.products);
                setProducts(product);
            })
            .catch(e => {
                console.log(e);
            });
    };

    
    return (
        <div className="Tabs">
            <ul className="nav">
                <TabNavItem title="Homepage" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Comparison" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Search" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Login" id="tab4" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>

            <div className="outlet">
                <TabContent id="tab1" activeTab={activeTab}>
                    <HomePage/>
                </TabContent>
                <TabContent id="tab2" activeTab={activeTab}>
                    <ProductComparison products={product} />
                </TabContent>
                <TabContent id="tab3" activeTab={activeTab}>
                    <SearchBar placeholder="Enter an item" data={product}/>
                </TabContent>
                <TabContent id="tab4" activeTab={activeTab}>
                    <Login />
                </TabContent>
                

            </div>
        </div>
    );
};
export default Tabs;