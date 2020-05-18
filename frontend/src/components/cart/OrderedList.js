import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const OrderedList = (props) => {
    const products = props.products
    const list = products.map(items => (<li key={items.id}><NavLink to={`/ordered/${items.id}`}>
        {items.OrderId}
    </NavLink></li>))

    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    );
};


OrderedList.propTypes = {

};


export default OrderedList;
