import React from 'react';
import PropTypes from 'prop-types';
import '../../CSS/aboutUs.css'
import Contact from './contact';


const AboutUs = () => {
    return (
        <div>
            <div className="AboutUs">
                <h3>ABOUT US</h3>
                <p>At Peastan Global Limited, we offer best quality of Textiles, Cosmetics, Markups, Orginal Human Hairs,
                Organic Flawless creams and general goods. We offer both wholesale and retail services</p>
                <p>We maintain standard customer relation practices and our goods prices are one of the bests
                which have made us outstanding.</p>
                <p>We accept cash on delivery and bank transfer which are preferred by most persons due to high rate of internet scams. We believe in building trust,
                patronize us and you will be happy you did.</p>
            </div>
            <div className="contactHome">
                <Contact />
            </div>

        </div>
    );
};


AboutUs.propTypes = {

};


export default AboutUs;
