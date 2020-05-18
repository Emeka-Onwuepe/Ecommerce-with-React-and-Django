import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { storeContext, GET_CATEGORY, getCategory,load,LOADING } from '../../STATES/Actions/Actions';
import Products from './Product/product';


const Categorypage = (props) => {
    const { param, id } = useParams()
    const { storestate, storedispatch } = useContext(storeContext);


    useEffect(() => {
        const data = { "data": id, "search": "category" }
        getCategory(data, GET_CATEGORY).then(res => storedispatch(res))
        storedispatch(load(LOADING))
    }, [])
    let products = ""
    if (storestate.category != undefined) {
        products = storestate.category.products

    }
    if (products != "") {

    }
    return (
        <div>
            <h1>{param}</h1>
            {products != "" ? <Products products={products} /> : ""}

        </div>
    );
};


Categorypage.propTypes = {

};


export default Categorypage;
