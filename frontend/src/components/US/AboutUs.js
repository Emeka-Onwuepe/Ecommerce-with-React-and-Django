import React from 'react';
import PropTypes from 'prop-types';
import '../../CSS/aboutUs.css'
import Contact from './contact';


const AboutUs = () => {
    return (
        <div>
            <div className="AboutUs">
                <h3>ABOUT US</h3>
                <p>We are the best in the market Following the June 25, 2014 bomb blast
                in Wusa Abuja tablishing fund compensation for victims of terrorism in Nigeria.
                He believed that it would ensure that victims of terrorism are given a helping hand
                to rebuild their lives.
             He expressed sadness over the blast, saying that those killed</p>
                <p>We are the best in the market ja tablishing fund compensation for victims of terrorism
                in Nigeria.
                He believed that it would ensure that victims of terrorism are given a helping hand
            to rebuild their lives.</p>
                <p>We are the best in the market ishing fund compensation for victims of terrorism
            in Nigerias</p>
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
