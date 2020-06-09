import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import "../../CSS/ordered.css"

const OrderedList = (props) => {
    const products = props.products
    const list = products.map(items => (<li key={items.id}><NavLink to={`/ordered/${items.id}/${items.total}`}>
        <span> Id:</span> {items.OrderId}
        <p>Amount: #{items.total}</p>
        <p> {items.created}</p>
    </NavLink></li>))

    return (
        <div className="orderedList">
            <h3>List of Orders</h3>
            <ol>
                {list}
            </ol>
        </div>

    );
};


OrderedList.propTypes = {

};


export default OrderedList;
