import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { storeContext } from '../../STATES/Actions/Actions';
import styles from "../../CSS/slides.module.scss"
const { banner, bannertext, slidetext } = styles

const Slides = (props) => {
    const { storestate } = useContext(storeContext);
    const { store } = storestate
    let images = []
    let text = 'We offer quality products for a token'
    if (store != undefined || store == "") {
        store.forEach(x => x.products.forEach(x => images.push(x.image)))
    }
    const [slideImage, setslideImage] = useState({ url: "", count: 0, });
    const [slideText, setslideText] = useState({ textCount: 0, text: "" });
    useEffect(() => {
        if (images.length >= 0) {
            let slideTimer = setInterval(() => {
                setslideImage({ url: images[slideImage.count], count: slideImage.count >= images.length - 1 ? 0 : slideImage.count + 1 })
            }, 1000)
            return () => {
                clearInterval(slideTimer)
            }
        }
    }, [slideImage])

    useEffect(() => {
        if (images.length >= 0) {
            let texttimer = setInterval(() => {
                setslideText({ textCount: slideText.textCount >= text.length ? 0 : slideText.textCount + 1, text: text[slideText.textCount] == undefined ? "" : slideText.text + text[slideText.textCount] })
            }, 100)
            return () => {
                clearInterval(texttimer)
            }
        }
    }, [slideText])

    return (
        <div className={banner} style={{ backgroundImage: `url(${slideImage.url})` }}>
            <div className={bannertext}>
                <p id={slidetext}>{slideText.text}</p>
            </div>

        </div>
    );
};


Slides.propTypes = {

};


export default Slides;
