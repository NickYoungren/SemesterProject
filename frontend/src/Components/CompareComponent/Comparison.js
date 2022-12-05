import React, { useState } from 'react'
import { Grid, Item, Table, Label } from "semantic-ui-react";
import ProductCard from "./ProductCard";


const ProductComparison = ({ products }) => {
    const [selectedItems, setSelectedItems] = useState([]);


    const addToCompare = (item) => {
        if(selectedItems.length > 2){
            alert("Only three products are allowed!")
        } else {
            setSelectedItems((selectedItems) => [...selectedItems, item])
        }
    };

    const removeFromCompare = (item) => {
        const filteredItems = selectedItems.filter(
            product => product._id !== item._id
        );
        setSelectedItems(filteredItems)
    };

    return (
       <div>
        {selectedItems.length > 0 && (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        {selectedItems.map((el) => (
                            <Table.HeaderCell 
                            key={el._id}>{el.Name}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    
                    <Table.Row>
                        <Table.Cell>
                            <Label color="orange" ribbon>
                                Price
                            </Label>
                        </Table.Cell>
                        {selectedItems.map((el) => (
                            <Table.Cell key={el._id}>{el.Price}</Table.Cell>
                        ))}
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Label color="teal" ribbon>
                                Description
                            </Label>
                        </Table.Cell>
                        {selectedItems.map((el) => (
                            <Table.Cell key={el._id}>{el.Description}</Table.Cell>
                        ))}
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Label color="pink" ribbon>
                                Brand
                            </Label>
                        </Table.Cell>
                        {selectedItems.map((el) =>(
                            <Table.Cell key={el._id}>{el.Brand}</Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Body>
            </Table>
        )}
        <Grid Columns={selectedItems.length} stackable padded divided>
            <Item.Group>
                {products.map((product) => (
                    <ProductCard
                     key={product._id}
                     product={product}
                     selected={selectedItems}
                     addToCompare={addToCompare}
                     removeFromCompare={removeFromCompare}
                     />
                ))}
            </Item.Group>
        </Grid>
       </div>
    );
};

export default ProductComparison