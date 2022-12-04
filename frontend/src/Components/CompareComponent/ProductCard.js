import React from "react";
import { Item, Button } from "semantic-ui-react";

const ProductCard = ({
    product,
    addToCompare,
    removeFromCompare,
    selected
}) => (
    <Item key={product.Name}>
        <Item.Image size="small" src={product.Image} />
        <Item.Content verticalAlign="middle">
            <Item.Header style={{color: "white"}}>{product.Name}</Item.Header>
            <Item.Description style={{color: "white"}}>{product.Price}</Item.Description>
            <Item.Extra>
                {selected && selected.includes(product) ? (
                    <Button color="red" onClick={() => removeFromCompare(product)}>
                        Remove
                    </Button>
                ) : (
                    <Button color="blue" onClick={() => addToCompare(product)}>
                        Compare
                    </Button>
                )}
            </Item.Extra>
        </Item.Content>
    </Item>
);

export default ProductCard