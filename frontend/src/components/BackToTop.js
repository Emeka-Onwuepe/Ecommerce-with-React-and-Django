import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { storeContext } from '../STATES/Actions/Actions';

const backToTopStyle = {
    position: "fixed",
    right: "5%",
    top: "63%",
    textAlign: "center",
    backgroundColor: "rgba(1, 1, 1, 0.4)",
    zIndex: "150",
    padding: "2px",
    transform: "rotate(90deg)",
    display: "none"
}

const BackToTop = () => {

    const { storestate } = useContext(storeContext);
    const [backTotop, setbackTotop] = useState({ back: false })
    const { scrow } = storestate
    const onClick = () => {
        window.scrollTo("", 0)
        setbackTotop({ back: !backTotop.back })
    }
    useEffect(() => {
        // window.scrollTop = 0
        console.log("helo")
    }, [backTotop])
    let display = "none"



    if (scrow >= 1000) {
        display = "block"
    } else {
        display = "none"

    }
    return (
        <div style={{ ...backToTopStyle, display }} id="backToTop" className="backToTop">
            <button onClick={onClick}> &#10094;</button>
        </div>
    );
};


BackToTop.propTypes = {

};


export default BackToTop;
