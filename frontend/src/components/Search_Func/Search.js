import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { storeContext, addSearch, getCategory, GET_ALL, DELETE_SEARCH,load,LOADING } from '../../STATES/Actions/Actions';
import Products from "../categories/Product/product"

const initial = { search: "" }
const searchFunc = (data, store, dispatch, func) => {
    let result = []
    store.forEach(product => {
        if (product.brand.toLowerCase().indexOf(data.toLowerCase()) > -1
            || product.name.toLowerCase().indexOf(data.toLowerCase()) > -1) {
            result.push(product)
        }
    })
    dispatch(func(result))

}

const Search = (props) => {
    const { storestate, storedispatch } = useContext(storeContext)
    const { searchstore } = storestate
    const [searchstate, setSearch] = useState(initial)
    const { search } = searchstate;
    let searchResult = ""

    useEffect(() => {
        const data = { "data": "none", "search": "all" }
        getCategory(data, GET_ALL).then(res => storedispatch(res))
        storedispatch(load(LOADING))
        return () => {
            storedispatch({ type: DELETE_SEARCH })
        }
    }, []);

    if (storestate.searchResult != undefined && storestate.searchResult != "") {
        searchResult = <Products products={storestate.searchResult} />
    }

    const onChange = (e) => {
        setSearch({ ...searchstate, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();
        const { search } = searchstate;
        searchFunc(search, searchstore.products, storedispatch, addSearch)
    }

    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <input onChange={onChange} type="text" name="search" value={search} id="search" />
                <button type="submit">Search</button>
            </form>
            <div>

                {searchResult}
            </div>
        </div>
    );
};


Search.propTypes = {

};


export default Search;
