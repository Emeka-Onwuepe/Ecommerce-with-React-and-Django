import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import "../../../CSS/product.css"

const Products = (props) => {
    const products = props.products

    const capitalizeFirst = (data) => {
        let words = data.split(" ")
        let result = []
        for (const word of words) {
            let firstWord = word.slice(0, 1).toUpperCase()
            let rest = word.slice(1).toLowerCase()
            result.push(`${firstWord}${rest}`)
        }
        return result.join(' ')
    }

    return (
        <Fragment>
            {products.map(items => {
                return <NavLink key={items.id} to={`/product/${items.brand}/${items.id}/${items.name}`}>
                    <div className="productDisplayBox">
                        <div className="imageContainer">
                            <img src={items.image} alt={`${items.name} image`} />
                        </div>
                        <p >{capitalizeFirst(items.name)}</p>
                        {items.multiprice.length > 0 ? <p id="prices">See Prices</p> : <p className="price">  &#x20A6; {` ${items.price}`}</p>}
                    </div>
                </NavLink>
            })}
        </Fragment>
    );
};

Products.propTypes = {

};


export default Products;
