import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { storeContext, getstore, load, LOADING } from '../../STATES/Actions/Actions';
import Products from './Product/product';
import "../../CSS/category.css";


const Categories = (props) => {
    const { storestate, storedispatch } = useContext(storeContext)
    useEffect(() => {
        getstore().then(res => storedispatch(res))
        storedispatch(load(LOADING))
    }, []);
    const { store } = storestate
    let category = ""

    if (store != undefined || store == "") {
        category = store.map(items => {
            return <div key={items.id} className="categoryDisplayBox">
                <NavLink to={`/categories/${items.id}/${items.name}`}>
                    <h3>{items.name.toUpperCase()}</h3>
                </NavLink>
                <Products products={items.products} />
            </div>
        })
    } else {
        category = <Fragment />
    }

    return (
        <Fragment >
            {category}
        </Fragment>
    );
};


Categories.propTypes = {

};


export default Categories;
