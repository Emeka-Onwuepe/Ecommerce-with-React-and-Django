import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { storeContext, getCategory, GET_ORDERED_PRODUCTS, load, LOADING, LOADED } from '../../STATES/Actions/Actions';
import '../../CSS/ordered.css'

const OrderedItems = (props) => {
    const { id, total } = useParams()
    const { storestate, storedispatch } = useContext(storeContext)
    const { OrderedProduct } = storestate
    const { products } = OrderedProduct
    let items = ""

    useEffect(() => {
        const data = { "data": id, "search": "orderedproducts" }
        getCategory(data, GET_ORDERED_PRODUCTS).then(res => storedispatch(res));
        storedispatch(load(LOADING))
    }, [])
    if (products != undefined && products.length > 0) {
        items = products.map(item => <tr key={item.id}>
            <td>{item.name} </td>
            <td>{item.brand} </td>
            <td>{item.price} </td>
            <td>{item.quantity} </td>
            <td>{item.price * item.quantity} </td>
        </tr>)
    }
    if (storestate.User == "") {
        return < Redirect to="/ShoppingCart" />
    }

    if (items == "") {
        return <Fragment></Fragment>

    } else {

        return (
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {items}
                <tfoot>
                    <tr>
                        <td colspan="4">Total</td>
                        <td>#{total}</td>
                    </tr>
                </tfoot>
            </table>
        );

    }

};


OrderedItems.propTypes = {

};


export default OrderedItems;
