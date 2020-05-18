import React, { useContext, useEffect, useState,Fragment } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { storeContext, getCategory, GET_BRAND, addToCart,load,LOADING } from '../../../STATES/Actions/Actions';
import Products from './product';
const ProductPage = (props) => {
    const { brand, id, name } = useParams()
    const [DivDisplay, setDivdisplay] = useState({ display: false })
    const { storestate, storedispatch } = useContext(storeContext)
    let product = { image: "", name: "", brand: "", price: "", discription: "" }
    let products = ""
    let check = ""
    useEffect(() => {
        const data = { "data": brand, "search": "brand" }
        getCategory(data, GET_BRAND).then(res => storedispatch(res))
        storedispatch(load(LOADING))
    }, [])
    const onClick = () => {
        setDivdisplay({ display: true })
        let check = false;
        storestate.cart.forEach(x => {
            if (x.id == id) {
                check = true
            }
        })
        const data = { id: product.id, name: product.name, brand: product.brand, price: product.price, quantity: 1, image: product.image }
        if (check != true) {
            storedispatch(addToCart(data))
        }

    }
    if (storestate.brand != undefined) {

        const store = storestate.brand.products
        products = store.filter(product => product.id != id)
        let [item] = store.filter(product => product.id == id)
        if (item != undefined) {
            product = item
        }
    }
    const decisionBox = <div style={{ position: "fixed", top: "30%", left: "30%", border: "2px solid white", backgroundColor: "white" }}>
        <p>some decison making</p>
        <button onClick={() => { setDivdisplay({ display: false }) }}>Continue shopping</button>
        <NavLink to="/ShoppingCart"><button>View shopping cart/check out</button> </NavLink>
    </div>
    if (storestate.brand != undefined && product.image != "") {
        return (
            <div>
                <div>
                    <img src={product.image} alt="" />
                    <p >{product.name}</p>
                    <p >{product.brand}</p>
                    <p >{` #${product.price}`}</p>
                    <p>{product.discription}</p>
                    <button onClick={onClick}>ADD TO CART</button>
                </div>
                {DivDisplay.display ? decisionBox : ""}
                <div>
                    {products != "" ? <h3>Products of same brand</h3> : ""}
                    {products != "" ? <Products products={products} /> : ""}
                </div>
            </div>
        );
    } else {
        return (<Fragment/>)
    }

};

ProductPage.propTypes = {

};


export default ProductPage;
