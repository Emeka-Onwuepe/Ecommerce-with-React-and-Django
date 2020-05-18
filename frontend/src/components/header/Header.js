import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import styles from "../../CSS/header.module.scss"

const { header, separator } = styles


const Header = () => {

    return (
        <Fragment>
            <header className={header} >
                <Nav />
            </header>
            <div className={separator}></div>
        </Fragment>
    );
};


Header.propTypes = {

};


export default Header;
