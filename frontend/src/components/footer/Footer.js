import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { storeContext } from '../../STATES/Actions/Actions';



const Footer = (props) => {
    const { storestate } = useContext(storeContext);
    const { screenWidth, scrow } = storestate
    const desktopView = 1000
    let location = useLocation()
    const test = /(searchproduct|ordered|confirmOrder)/.test(location.pathname)
    console.log(test)
    const test2 = /(^\/$|categories|product)/.test(location.pathname)
    const desktop = screenWidth > desktopView
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
    let footerStyleHome = {
        clear: "both",
        borderTop: "0px solid black",
        backgroundColor: "rgba(0, 0, 0, 0.9) ",
        width: "75% ",
        marginLeft: "25%"
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
            <footer style={test && desktop ? footerStyleAlter : test2 && desktop ? footerStyleHome : footerStyle}>
                <p id="footer"> Copyright &copy; <span id="footerdate" style={{ padding: "0%" }}>{footerDate}</span>.
             All rights reserved. Peastan.com <br /> Designed by CasTech. </p>
            </footer>
        </div>
    );
};


Footer.propTypes = {

};


export default Footer;
