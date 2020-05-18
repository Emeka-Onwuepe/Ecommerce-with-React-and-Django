import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { storeContext, RegisterUser, ADD_ERROR, load, LOADED, LOADING } from '../../STATES/Actions/Actions';

const RegisterAccount = (props) => {
    const { storestate, storedispatch } = useContext(storeContext);
    const initialState = {
        first_name: "", last_name: "", email: "", phone_number: "", password: "", confirm_password: ""
    }
      const initialErrorState = {
        first_name:false, last_name:false, phone_number:false,email:false,phoneNumLength:false
    }
    useEffect(() => {
        storedispatch(load(LOADED))
    }, []);
    const [formstate, setFormstate] = useState(initialState);
    const [errorstate, setErrorstate] = useState(initialErrorState);
    const { first_name, last_name, phone_number, email, password, confirm_password } = formstate;
    let errorTest = {
        "name": /[^a-z\s]/i,
        "phone_number": /[^0-9+\s]/i,
        "email": /^[a-z]+\d*[a-z]*@[a-z]+\.\w+\s*$/gi,
    }

    const onChange = (e) => {
        setFormstate({ ...formstate, [e.target.name]: e.target.value })
    }
   
    const onSubmit = e => {
        e.preventDefault();
        const { first_name, last_name, phone_number, email, password, confirm_password } = formstate;
        const data = JSON.stringify({ first_name, last_name, phone_number, email, "address": "null", password })
        const config = { headers: { "Content-Type": "application/json" } }
        const phone= errorTest.phone_number.test(phone_number)
        const firstName= errorTest.name.test(first_name)
        const lastName= errorTest.name.test(last_name)
        const Email= !errorTest.email.test(email)
        const phoneNumLength= phone_number.length<11
        
        setErrorstate(initialErrorState)
        if (password == confirm_password && !firstName && !lastName && !phone && !Email && !phoneNumLength) {
            RegisterUser(data, config).then(res => storedispatch(res))
            storedispatch(load(LOADING))
        } else if(password != confirm_password ) {
            storedispatch({ type: ADD_ERROR, data:{"passwordError":"passwords did not match"}})
        }
        setErrorstate({first_name:firstName, last_name:lastName, phone_number:phone,email:Email,phoneNumLength})
    }

    if (storestate.check) {
        return <Redirect to="/ShoppingCart" />
    }
    return (
        <fieldset>
            <form action="" method="post" onSubmit={onSubmit}>
                <label htmlFor="first_name">FIRST NAME</label>
                {errorstate.first_name?<p className="error">Only alphabets are allowed</p>:""}
                <input type="text" name="first_name" value={first_name} id="first_name" onChange={onChange} placeholder="Enter first name" required />
                <label htmlFor="last_name">LAST NAME</label>
                {errorstate.last_name?<p className="error">Only alphabets are allowed</p>:""}
                <input type="text" name="last_name" value={last_name} id="last_name" onChange={onChange} placeholder="Enter last name" required />
                <label htmlFor="phone_number">PHONE NUMBER</label>
                {errorstate.phone_number?<p className="error">Only digits/numbers are allowed</p>:errorstate.phoneNumLength?<p className="error">Phone Number should not be less than 11 digits </p>:""}
                <input type="text" name="phone_number" value={phone_number} id="phone_number" onChange={onChange} placeholder="Enter phone number" required />
                <label htmlFor="email">EMAIL</label>
                {errorstate.email?<p className="error">Invalid Email</p>:""}
                <input type="email" name="email" value={email} id="email" onChange={onChange} placeholder="Enter email" required />
                <label htmlFor="password">PASSWORD</label>
                <input type="password" name="password" value={password} id="password" onChange={onChange} placeholder="Enter password" required />
                <label htmlFor="confirm_password">CONFIRM PASSWORD</label>
                <input type="password" name="confirm_password" value={confirm_password} id="password" onChange={onChange} placeholder="Confirm password" required />
                <button className='submitButton' type="submit">REGISTER</button>
            </form>
        </fieldset>
    );
}

RegisterAccount.propTypes = {

};


export default RegisterAccount;
