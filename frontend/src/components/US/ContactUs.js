import React, { useContext, useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { storeContext, load, LOADING, LOADED, sendMail } from "../../STATES/Actions/Actions";
import { Redirect } from 'react-router-dom';
import Contact from './contact';


const ContactUs = () => {
    const { storestate, storedispatch } = useContext(storeContext);

    useEffect(() => {
        storedispatch(load(LOADED))
    }, []);

    const initialState = {
        full_name: '', subject: '', email: '', phone_number: '', message: ""
    }
    const initialErrorState = {
        full_name: false, subject: false, phone_number: false, email: false, phoneNumLength: false
    }
    const [formstate, setFormstate] = useState(initialState);
    const [errorstate, setErrorstate] = useState(initialErrorState);
    const { full_name, subject, phone_number, email, message } = formstate;
    let errorTest = {
        "full_name": /[^a-z\s]/i,
        "email": /^[a-z]+\d*[a-z]*@[a-z]+\.\w+\s*$/gi,
        "message": /[^a-z\s.,;':)(0-9"#_-]/i,
        "subject": /[^a-z\s.,;':)(0-9"#_-]/i,
        "phone_number": /[^0-9+\s]/i
    }


    const onChange = (e) => {
        setFormstate({ ...formstate, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();

        const { full_name, subject, phone_number, email, message } = formstate;
        const phone = errorTest.phone_number.test(phone_number)
        const fullName = errorTest.full_name.test(full_name)
        const subjectTest = errorTest.subject.test(subject)
        const Email = !errorTest.email.test(email)
        const phoneNumLength = phone_number.length < 11
        const data = JSON.stringify({ full_name, subject, phone_number, email, message })
        const config = { headers: { "Content-Type": "application/json" } }

        setErrorstate(initialErrorState)
        if (!fullName && !subjectTest && !phone && !Email && !phoneNumLength) {
            sendMail(data, config).then(res => storedispatch(res))
            storedispatch(load(LOADING))
        }
        setErrorstate({ full_name: fullName, subject: subjectTest, phone_number: phone, email: Email, phoneNumLength })
    }
    if (storestate.messages == "Your Message was sent successfully") {
        return <Redirect to="/" />
    }
    return (
        <Fragment>
            <Contact />
            <fieldset >
                <legend>CONTACT US</legend>
                <form action="" method="post" onSubmit={onSubmit}>
                    <label htmlFor="full_name">FULL NAME</label>
                    {errorstate.full_name ? <p className="error">Only alphabets are allowed</p> : ""}
                    <input type="text" name="full_name" value={full_name} id="full_name" onChange={onChange} placeholder="Enter your full name" required />
                    <label htmlFor="subject">SUBJECT</label>
                    {errorstate.subject ? <p className="error">Only alphabets are allowed</p> : ""}
                    <input type="text" name="subject" value={subject} id="subject" onChange={onChange} placeholder="Message Subject" required />
                    <label htmlFor="phone_number">PHONE NUMBER</label>
                    {errorstate.phone_number ? <p className="error">Only digits/numbers are allowed</p> : errorstate.phoneNumLength ? <p className="error">Phone Number should not be less than 11 digits </p> : ""}
                    <input type="text" name="phone_number" value={phone_number} id="phone_number" onChange={onChange} placeholder="Enter your phone number" required />
                    <label htmlFor="email">EMAIL</label>
                    {errorstate.email ? <p className="error">Invalid Email</p> : ""}
                    <input type="email" name="email" value={email} id="email" onChange={onChange} placeholder="Enter your email" required />
                    <label htmlFor="message">MESSAGE</label>
                    <textarea name="message" value={message} id="message" onChange={onChange} cols="" rows="5" placeholder="Let's hear from you" required />
                    <button className='submitButton' type="submit">SUBMIT</button>
                </form>
            </fieldset>
        </Fragment>
    );

};

ContactUs.propTypes = {

};


export default ContactUs;

