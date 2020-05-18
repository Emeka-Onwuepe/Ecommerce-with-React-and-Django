import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { storeContext } from '../STATES/Actions/Actions';
import "../CSS/loader.css"

const Loading = () => {
    const { storestate, storedispatch } = useContext(storeContext);
    const { loading } = storestate
    return (
        <Fragment>
                {loading ? 
                <div className="container">
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>
                : ""}
        </Fragment>
    );
};


Loading.propTypes = {

};


export default Loading;
