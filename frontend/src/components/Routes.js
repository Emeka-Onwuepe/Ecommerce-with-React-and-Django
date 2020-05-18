import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Login from './accounts/Login';
import { storeContext } from '../STATES/Actions/Actions';
import Categories from './categories/Categories';
import CategoryDisplay from './categories/CategoryDisplay';
import Slides from './slides/Slides';
import Search from './Search_Func/Search';
import HomeSearch from './Search_Func/HomesearchFunc';
import Categorypage from './categories/categorypage';
import ProductPage from './categories/Product/ProductPage';
import RegisterAccount from './accounts/Register';
import ShoppingCart from './cart/ShoppingCart';
import Details from './accounts/Details';
import OrderedItems from './cart/OrderedItems';


const Routes = ({ component: component, ...rest }) => {
    const { storestate } = useContext(storeContext);
    const { User, store } = storestate

    return (
        <Fragment>
            <Route exact path='/' >
                <Slides />
                <div className="wrapper">
                    <HomeSearch />
                    <CategoryDisplay />
                    <Categories />
                </div>
            </Route>
            <Route path='/searchproduct' >
                <div className="wrapper">
                    <Search />
                </div>
            </Route>
            <Route path='/register' >
                <div className="wrapper">
                    <RegisterAccount />
                </div>
            </Route>
            <Route path='/ShoppingCart' >
                <div className="wrapper">
                    <ShoppingCart />
                </div>
            </Route>
            <Route path='/ordered/:id' >
                <div className="wrapper">
                    <OrderedItems />
                </div>
            </Route>
            <Route path='/confirmOrder' >
                <div className="wrapper">
                     <Details />
                </div>
            </Route>
            <Route path='/categories/:id/:param' >
                <Slides />
                <div className="wrapper">
                    <Categorypage />
                </div>
            </Route>
            <Route path='/product/:brand/:id/:name' >
                <div className="wrapper">
                    <ProductPage />
                </div>
            </Route>
            <Route path='/login' render={() => {
                if (User != undefined && User != "") {
                    return <Redirect to="/ShoppingCart" />
                } else {
                    return <div className="wrapper"><Login /></div>
                }
            }} />
        </Fragment>
    );
};


Routes.propTypes = {

};


export default Routes;
