import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { storeContext, LogOut,load,LOADING } from '../../STATES/Actions/Actions';

function Nav(props) {
    const { storestate, storedispatch } = useContext(storeContext);

    const logout = (e) => {
        e.preventDefault;
        const config = { headers: { "Content-Type": "application/json", "Authorization": `Token ${storestate.User.token}` } }
        LogOut(null, config).then(res => storedispatch(res))
        storedispatch(load(LOADING))
    }
    return (
        <Fragment>
            <nav className="nav">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/ShoppingCart">Cart</NavLink>
                <NavLink to="/searchproduct">searchproduct</NavLink>
            </nav>
            <div className="logControl">
                <NavLink to="/login">LOGIN</NavLink>
                {storestate.User != "" ? <button onClick={logout}>LOGOUT</button> : ""
                }
            </div>
        </Fragment>
    )
}

Nav.propTypes = {

}

export default Nav

