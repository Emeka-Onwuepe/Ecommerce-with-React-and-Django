import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


const style = {
    margin: "21% auto 21% auto",
    width: "200px",
}

const PageNotFound = () => {
    return (<h1 style={style}>PAGE NOT FOUND</h1>)

};


PageNotFound.propTypes = {

};


export default PageNotFound;
