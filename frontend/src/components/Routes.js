import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './accounts/Login';
import { storeContext } from '../STATES/Actions/Actions';
import Categories from './categories/Categories';
import Slides from './slides/Slides';
import Search from './Search_Func/Search';
import HomeSearch from './Search_Func/HomesearchFunc';
import Categorypage from './categories/categorypage';
import ProductPage from './categories/Product/ProductPage';
import RegisterAccount from './accounts/Register';
import ShoppingCart from './cart/ShoppingCart';
import Details from './accounts/Details';
import OrderedItems from './cart/OrderedItems';
import PageNotFound from "../components/PageNotFound";
import AboutUs from "./US/AboutUs";
import ContactUs from "./US/ContactUs"
import SideNav from "./sidenav/SideNav"


const Routes = ({ component: component, ...rest }) => {
    const { storestate } = useContext(storeContext);
    const { User, store } = storestate

    return (
        <Switch>
            <Route exact path='/' >
                <Slides />
                <div className="wrapper">
                    <HomeSearch />
                    <SideNav />
                    <Categories />
                    <AboutUs />
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
            <Route path='/ordered/:id/:total' >
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
                    <SideNav />
                    <Categorypage />
                </div>
            </Route>
            <Route path='/product/:brand/:id/:name' >
                <div className="wrapper">
                    <SideNav />
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
            <Route path="/contact_us" ><ContactUs /></Route>
            <Route  ><PageNotFound /></Route>
        </Switch>
    );
};


Routes.propTypes = {

};


export default Routes;
