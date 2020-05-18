import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from "../../../CSS/product.module.scss"
const { productDisplayBox, price } = styles

const Products = (props) => {
    const products = props.products

    return (
        <Fragment>
            {products.map(items => {
                return <NavLink key={items.id} to={`/product/${items.brand}/${items.id}/${items.name}`}>
                    <div className={productDisplayBox}>
                        <img src={items.image} alt="" />
                        <p >{items.name}</p>
                        <p className={price}>{` #${items.price}`}</p>
                    </div>
                </NavLink>
            })}
        </Fragment>
    );
};

Products.propTypes = {

};


export default Products;
