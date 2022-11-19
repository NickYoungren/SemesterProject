import React, { useState } from "react";
import TabNavItem from "../V2/TabNavItem";
import TabContent from "../V2/TabContent";
import ProductComparison from "../CompareComponent/Comparison";
import SearchBar from "../SearchBarComponent/SearchBar";
import HomePage from "../HomePageComponent/HomePage";
import { products } from "../../data/data";


const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <div className="Tabs">
            <ul className="nav">
                <TabNavItem title="Homepage" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Comparison" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title="Search" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>

            <div className="outlet">
                <TabContent id="tab1" activeTab={activeTab}>
                    <HomePage/>
                </TabContent>
                <TabContent id="tab2" activeTab={activeTab}>
                    <ProductComparison products={products} />
                </TabContent>
                <TabContent id="tab3" activeTab={activeTab}>
                    <SearchBar placeholder="Enter a item" data={products}/>
                </TabContent>
            </div>
        </div>
    );
};
export default Tabs;