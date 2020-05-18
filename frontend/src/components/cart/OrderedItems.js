import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams,Redirect } from 'react-router-dom';
import { storeContext, getCategory, GET_ORDERED_PRODUCTS,load, LOADING, LOADED } from '../../STATES/Actions/Actions';


const OrderedItems = (props) => {
    const { id } = useParams()
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
        items = products.map(item => <div key={item.id}>
            <li>{item.name} </li>
            <li>{item.brand} </li>
            <li>{item.quantity} </li>
        </div>)
    }
    if (storestate.User=="") {
        return < Redirect to="/ShoppingCart" />
    }
    return (
        <div>
            {items}
        </div>
    );
};


OrderedItems.propTypes = {

};


export default OrderedItems;
