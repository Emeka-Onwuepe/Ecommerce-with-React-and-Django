import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { storeContext, UpdateCart } from '../../STATES/Actions/Actions';
import "../../CSS/cartItem.css"


const CartItem = (props) => {
    const product = props.product
    const { storestate, storedispatch } = useContext(storeContext);
    const { cart } = storestate
    const deleteItem = (e) => {
        e.preventDefault()
        const data = cart.filter(x => x.id != product.id)
        storedispatch(UpdateCart(data))
    }
    const increment = (e) => {
        e.preventDefault()
        for (const products of cart) {
            if (products.id == product.id) {
                products.quantity += 1
            }
        }
        storedispatch(UpdateCart(cart))
    }
    const decrement = (e) => {
        e.preventDefault()
        for (const products of cart) {
            if (products.id == product.id) {
                if (products.quantity > 1) {
                    products.quantity -= 1
                }
            }
        }
        storedispatch(UpdateCart(cart))
    }
    return (
        <div className="cartDisplayBox">
            <img src={product.image} alt="" />
            <p >{product.name}</p>
            <p >{product.brand}</p>
            <p > &#x20A6; {`${product.price}`}</p>
            <p>Qty: {product.quantity}</p>
            <p>size: {product.size}</p>
            <div className="controlButtons">
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
                <button onClick={deleteItem}>DELETE</button>
            </div>
        </div>
    )
};


CartItem.propTypes = {

};


export default CartItem;
