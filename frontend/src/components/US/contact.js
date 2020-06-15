import React from 'react';
import PropTypes from 'prop-types';
import "../../CSS/contact.css"


const Contact = () => {
    return (
        <div className="contact">
            <div className="headOffice office">
                <h3>Head Office</h3>
                <p><span> Address: </span> Shop 26 Midwifery Market, Okpanam Road, Asaba, Delta State</p>
                <p><span> Phone:</span> (+234) <span className="tel">08133819187</span>, <span className="tel">07067906892</span> </p>
            </div>
            <div className="branchOffice office">
                <h3>Branch Office</h3>
                <p><span> Address:</span> A2/156 Faithful Line Relief, Main Market at back of GBO, Onitsha, Anambra State.</p>
                <p><span> Phone:</span> (+234) <span className="tel">08099097617 </span> </p>
            </div>
        </div >
    );
};


Contact.propTypes = {

};


export default Contact;
