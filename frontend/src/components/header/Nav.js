import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { storeContext, LogOut, load, LOADING } from '../../STATES/Actions/Actions';
import "../../CSS/nav.css"

function Nav(props) {
    const { storestate, storedispatch } = useContext(storeContext);
    const { cart } = storestate

    const logout = (e) => {
        e.preventDefault;
        const config = { headers: { "Content-Type": "application/json", "Authorization": `Token ${storestate.User.token}` } }
        LogOut(null, config).then(res => storedispatch(res))
        storedispatch(load(LOADING))
    }
    return (
        <Fragment>
            <nav className="nav">
                <NavLink to="/ShoppingCart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                        <path d="M8 9h-7.161l-.839-2h8v2zm0 2h-6.322l.839 2h5.483v-2zm8.53-4h-6.53v2h5.966l.564-2zm-1.694 6l.564-2h-5.4v2h4.836zm-6.336 
                5c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm11.305-15l-3.432 12h-13.017l.839 
                2h13.659l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
                    </svg> <div className="counter">{cart ? cart.length : ""}</div></NavLink>

                <NavLink to="/searchproduct">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" /></svg>

                </NavLink>
                <NavLink to="/contact_us">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                        <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85
             0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" /></svg>
                </NavLink>
            </nav>
            <div className="logControl">
                <NavLink to="/login">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 
                1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 
                2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/>
                    </svg>
                </NavLink>
                {storestate.User != "" ? < button className="logout" onClick={logout}>LOG OUT</button> : ""
                }
            </div>
        </Fragment >
    )
}

Nav.propTypes = {

}

export default Nav

