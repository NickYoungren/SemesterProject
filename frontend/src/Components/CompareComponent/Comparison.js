import React, { useState } from 'react'
import { Grid, Item, Table, Label } from "semantic-ui-react";
import ProductCard from "./ProductCard";


const ProductComparison = ({ products }) => {
    const [selectedItems, setSelectedItems] = useState([]);


    const addToCompare = (item) => {
        setSelectedItems((selectedItems) => [...selectedItems, item])
    };

    const removeFromCompare = (item) => {
        const filteredItems = selectedItems.filter(
            product => product.id !== item.id
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
                            key={el.id}>{el.name}</Table.HeaderCell>
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
                            <Table.Cell key={el.id}>{el.price}</Table.Cell>
                        ))}
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Label color="teal" ribbon>
                                Description
                            </Label>
                        </Table.Cell>
                        {selectedItems.map((el) => (
                            <Table.Cell key={el.id}>{el.description}</Table.Cell>
                        ))}
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Label color="pink" ribbon>
                                Brand
                            </Label>
                        </Table.Cell>
                        {selectedItems.map((el) =>(
                            <Table.Cell key={el.id}>{el.brand}</Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Body>
            </Table>
        )}
        <Grid Columns={selectedItems.length} stackable padded divided>
            <Item.Group>
                {products.map((product) => (
                    <ProductCard
                     key={product.id}
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