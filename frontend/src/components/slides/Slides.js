import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { storeContext } from '../../STATES/Actions/Actions';
import styles from "../../CSS/slides.css"


const Slides = (props) => {
    const { storestate } = useContext(storeContext);
    const { store } = storestate
    let images = ['slide_1.jpg', 'slide_2.jpg']
    let url = ""

    let text = ["At Peastan Global, we offer best quality of Textiles, Cosmestics, Orginal Human Hairs, Organic Flawless creams and general goods.",
        "The Just Shall Live By Faith."]

    const [slideImage, setslideImage] = useState({ url: images[0], count: 0, });
    const [slideText, setslideText] = useState({ textCount: 0, text: "", lengthCount: 0 });

    let imageTest = images.slice(0)

    for (const image of imageTest) {
        url = image

    }

    useEffect(() => {
        if (images.length >= 0) {
            let slideTimer = setInterval(() => {
                setslideImage({ url: images[slideImage.count], count: slideImage.count >= images.length - 1 ? 0 : slideImage.count + 1 })
            }, 3000)
            return () => {
                clearInterval(slideTimer)
            }
        }
    }, [slideImage])

    useEffect(() => {
        if (images.length >= 0) {
            let texttimer = setInterval(() => {
                setslideText({
                    textCount: slideText.textCount >= text[slideText.lengthCount].length ? 0 : slideText.textCount + 1,
                    text: text[slideText.lengthCount][slideText.textCount] == undefined ? "" : slideText.text + text[slideText.lengthCount][slideText.textCount],
                    lengthCount: slideText.lengthCount >= text.length - 1 && slideText.textCount >= text[slideText.lengthCount].length ? 0 : slideText.textCount >= text[slideText.lengthCount].length ?
                        slideText.lengthCount + 1 : slideText.lengthCount
                })
            }, 100)
            return () => {
                clearInterval(texttimer)
            }
        }
    }, [slideText])

    //slideText.textCount>=text[slideText.lengthCount].length && slideText.lengthCount>=text.length ? 0 :0

    return (

        <div className="banner" >
            <img className="bannerImage" src={`static/CSS/${slideImage.url}`} alt="" />
            <div style={{ backgroundImage: `url(static/CSS/${url})`, display: "none" }}></div>
            <div className="bannertext">
                <p id="slidetext">{slideText.text}</p>
            </div>

        </div>
    );
};


Slides.propTypes = {

};


export default Slides;
