import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';
import "../../CSS/header.css"


const Header = () => {

    return (
        <Fragment>
            <header className="header" >
                <div id="logo_div">
                    <NavLink to="/"><img className="logo" src="/static/CSS/logo.jpg" alt="logo" width="100%" /></NavLink>
                </div>
                <Nav />
            </header>
            <div className="separator"></div>
        </Fragment>
    );
};


Header.propTypes = {

};


export default Header;
