import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LoginUser, storeContext, LOADED, LOADING, load } from "../../STATES/Actions/Actions";
import { NavLink, useLocation } from 'react-router-dom';
const Login = (props) => {
    const { storestate, storedispatch } = useContext(storeContext);
    let location = window.location.origin
    const initialState = {
        email: "", password: ""
    }

    useEffect(() => {
        storedispatch(load(LOADED))
    }, []);

    const [formstate, setFormstate] = useState(initialState);
    const { email, password } = formstate;

    const onChange = (e) => {
        setFormstate({ ...formstate, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = formstate;
        const data = JSON.stringify({ email, password })
        const config = { headers: { "Content-Type": "application/json" } }
        LoginUser(data, config).then(res => storedispatch(res))
        storedispatch(load(LOADING))
    }
    return (
        <fieldset>
            <form action="" method="post" onSubmit={onSubmit}>
                <label htmlFor="email">EMAIL</label>
                <input type="email" name="email" value={email} id="email" onChange={onChange} placeholder="Please Enter Your Email" />
                <label htmlFor="password">PASSWORD</label>
                <input type="password" name="password" value={password} id="password" onChange={onChange} placeholder="Please Enter Your Password" />
                <button className='submitButton' type="submit">LOGIN</button>
            </form>
            <p><NavLink to="/register">REGISTER</NavLink> </p>
            <p><a target="blank" href={`${location}/password_reset`}>FORGOT PASSWORD</a></p>
        </fieldset>
    );
}

Login.propTypes = {

};


export default Login;
