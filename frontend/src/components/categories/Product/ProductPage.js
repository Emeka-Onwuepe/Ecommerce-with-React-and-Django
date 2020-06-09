import React, { useContext, useEffect, useState, Fragment } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { storeContext, getCategory, GET_BRAND, addToCart, load, LOADING } from '../../../STATES/Actions/Actions';
import Products from './product';
import "../../../CSS/productpage.css"



const ProductPage = (props) => {
    const { brand, id, name } = useParams()
    const [DivDisplay, setDivdisplay] = useState({ display: false })
    const { storestate, storedispatch } = useContext(storeContext)
    const { store } = storestate
    let product = { image: "", name: "", brand: "", price: "", discription: "" }
    let products = "";
    let catProducts = "";
    let check = ""
    useEffect(() => {
        const data = { "data": brand, "search": "brand" }
        getCategory(data, GET_BRAND).then(res => storedispatch(res))
        storedispatch(load(LOADING))
    }, [id])

    if (storestate.brand != undefined) {

        const stores = storestate.brand.products
        products = stores.filter(product => product.id != id)
        let [item] = stores.filter(product => product.id == id)
        if (item != undefined) {
            product = item
        }

        if (products == "") {
            const catId = product.category
            let [category] = store.filter(x => x.id == catId)
            catProducts = category.products
        }
    }

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

    const decisionBox = <div className="decisionBox">
        <p>Choose either to continue shopping or to view your shopping cart by checking out</p>
        <button onClick={() => { setDivdisplay({ display: false }) }}>Continue Shopping</button>
        <NavLink to="/ShoppingCart"><button>Check Out</button> </NavLink>
    </div>
    if (storestate.brand != undefined && product.image != "") {
        return (
            <div className="productPage">
                <div className="productDisplay">
                    <img src={product.image} alt="" />
                    <p >{product.name}</p>
                    <p >{product.brand}</p>
                    <p >{` #${product.price}`}</p>
                    <p>{product.discription}</p>
                    <button onClick={onClick}>ADD TO CART</button>
                </div>
                {DivDisplay.display ? decisionBox : ""}
                <div>

                    {products != "" ?
                        <div className="categoryDisplayBox">
                            <h3>Products of same brand</h3>
                            <Products products={products} />
                        </div> : catProducts != "" ? <div className="categoryDisplayBox">
                            <h3>Products of same category</h3>
                            <Products products={catProducts} />
                        </div> : ""
                    }
                </div>
            </div>
        );
    } else {
        return (<Fragment />)
    }

};

ProductPage.propTypes = {

};


export default ProductPage;
