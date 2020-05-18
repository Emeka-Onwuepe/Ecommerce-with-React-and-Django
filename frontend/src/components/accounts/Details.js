import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { storeContext, processOrder, load, LOADING, LOADED } from "../../STATES/Actions/Actions";
import { Redirect } from 'react-router-dom';


const Details = () => {
    const { storestate, storedispatch } = useContext(storeContext);
    const { cart, User, success } = storestate
    const { user } = User

    useEffect(() => {
        storedispatch(load(LOADED))
    }, []);

    const initialState =user!=undefined? {
        first_name: user.first_name, last_name: user.last_name, email: user.email, phone_number: user.phone_number, address: ""
    }:{ }
    const initialErrorState = {
        first_name:false, last_name:false, phone_number:false,email:false,phoneNumLength:false}
    const [formstate, setFormstate] = useState(initialState);
    const [errorstate, setErrorstate] = useState(initialErrorState);
    const { first_name, last_name, phone_number, email, address } = formstate;
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
        let total = 0
        let products = []
        const date = Date.now().toString().slice(5)
        const random = Math.floor(Math.random() * 100)
        const OrderId = `#${random}${date}`
        
        for (const product of cart) {
            let amount = product.price * product.quantity
            total += amount
            products.push({ "name": product.name, "quantity": product.quantity, "brand": product.brand, "product": product.id })
        }
        const { first_name, last_name, phone_number, email, address } = formstate;
         const phone= errorTest.phone_number.test(phone_number)
        const firstName= errorTest.name.test(first_name)
        const lastName= errorTest.name.test(last_name)
        const Email= !errorTest.email.test(email)
        const phoneNumLength= phone_number.length<11
        const data = JSON.stringify({
            user: { first_name, last_name, phone_number, email, address },
            Ordered: { OrderId, customer: user.id, total }, OrderedProduct: products
        })
        const config = { headers: { "Content-Type": "application/json", "Authorization": `Token ${storestate.User.token}` } }
       
        setErrorstate(initialErrorState)
        if (!firstName && !lastName && !phone && !Email && !phoneNumLength) {
             processOrder(data, config).then(res => storedispatch(res))
             storedispatch(load(LOADING))
        } 
        setErrorstate({first_name:firstName, last_name:lastName, phone_number:phone,email:Email,phoneNumLength})
    }
      if (User=="") {
        return < Redirect to="/login" />
    }
    if (storestate.success) {
        return < Redirect to="/ShoppingCart" />
    }
    return (
        <fieldset>
            <legend>CONFIRM YOUR DETAILS</legend>
            <form action="" method="post" onSubmit={onSubmit}>
                <label htmlFor="first_name">FIRST NAME</label>
                {errorstate.first_name?<p className="error">Only alphabets are allowed</p>:""}
                <input type="text" name="first_name" value={first_name} id="first_name" onChange={onChange} placeholder="Please Enter Your first name" required />
                <label htmlFor="last_name">LAST NAME</label>
                {errorstate.last_name?<p className="error">Only alphabets are allowed</p>:""}
                <input type="text" name="last_name" value={last_name} id="last_name" onChange={onChange} placeholder="Please Enter Your last name" required />
                <label htmlFor="phone_number">PHONE NUMBER</label>
                {errorstate.phone_number?<p className="error">Only digits/numbers are allowed</p>:errorstate.phoneNumLength?<p className="error">Phone Number should not be less than 11 digits </p>:""}
                <input type="text" name="phone_number" value={phone_number} id="phone_number" onChange={onChange} placeholder="Please Enter Your phone number" required />
                <label htmlFor="email">EMAIL</label>
                {errorstate.email?<p className="error">Invalid Email</p>:""}
                <input type="email" name="email" value={email} id="email" onChange={onChange} placeholder="Please Enter Your Email" required />
                <label htmlFor="address">ADDRESS</label>
                <input type="address" name="address" value={address} id="address" onChange={onChange} placeholder="Please Enter Your address" required />
                <button className='submitButton' type="submit">SUBMIT</button>
            </form>
        </fieldset>

    );

};

Details.propTypes = {

};


export default Details;

