import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';


const Footer = (props) => {
    let location = useLocation()
    const test = /(searchproduct|ShoppingCart|ordered|confirmOrder)/.test(location.pathname)
    console.log(test)
    let publishedDate = props.date
    let date = new Date;
    let year = date.getFullYear();
    let footerDate = year
    let footerStyle = {
        clear: "both",
        borderTop: "0px solid black",
        backgroundColor: "rgba(0, 0, 0, 0.9) ",
        width: "100% ",
    }
    let footerStyleAlter = {
        clear: "both",
        borderTop: "0px solid black",
        backgroundColor: "rgba(0, 0, 0, 0.9) ",
        width: "100% ",
        position: "fixed",
        bottom: "0px"
    }
    if (year != publishedDate) {
        footerDate = `${publishedDate} - ${year}`;

    }
    return (
        <div>
            <footer style={test ? footerStyleAlter : footerStyle}>
                <p id="footer"> Copyright &copy; <span id="footerdate" style={{ padding: "0%" }}>{footerDate}</span>.
             All rights reserved. Illumepedia.com <br /> Designed by Emeka Onwuepe. </p>
            </footer>
        </div>
    );
};


Footer.propTypes = {

};


export default Footer;
