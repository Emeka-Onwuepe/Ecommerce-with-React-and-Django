import React, { useContext, Fragment, useEffect, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { storeContext } from '../../STATES/Actions/Actions';
import "../../CSS/sideNav.css";


const fixedSideBarPhoneView = {
    position: "fixed",
    width: "300px",
    height: "83%",
    backgroundColor: "#f4f8f7",
    top: "100px",
    left: "0%",
    overflowX: "hidden",
    overflowY: "scroll",
    boxSizing: "border-box",
    padding: "1% 0% 1% 0%",
    display: "none",
    zIndex: "200",
}

const fixedSideBar1000 = {
    display: "block",
    position: "relative",
    width: "25%",
    height: "85%",
    backgroundColor: "#f4f8f7",
    top: "0px",
    left: "-9px",
    overflowX: "hidden",
    overflowY: "scroll",
    boxSizing: "border-box",
    padding: "1% 0% 1% 0%",
    zIndex: "200",
}

const SideNav = (props) => {
    const { storestate } = useContext(storeContext);
    const { screenWidth, scrow, store } = storestate
    const desktopView = 1000
    let category = ""
    let location = useLocation()
    const test = /(product)/.test(location.pathname);

    const intialDispay = screenWidth >= desktopView ? { display: true } : { display: false }

    const [sideNavstate, setSideNavstate] = useState({});
    const [sideNavDisplay, setSideNavDisplay] = useState(intialDispay)
    const [searchState, setSearch] = useState({ searching: false, searched: "", data: "" });

    let Display = sideNavDisplay.display ? "block" : "none"

    const onclick = () => {
        setSideNavDisplay({ display: !sideNavDisplay.display })
    }

    useEffect(() => {
        stickSideBar()
        return () => {
        };
    }, [storestate]);
    const stickSideBar = () => {

        if (screenWidth >= desktopView && scrow >= 510 || test && screenWidth >= desktopView && scrow >= 50) {
            setSideNavstate({ ...fixedSideBar1000, position: "fixed", top: "100px", left: "0px" })

        } else if (screenWidth >= desktopView && scrow <= 470 || test && screenWidth >= desktopView && scrow <= 30) {
            setSideNavstate({ ...fixedSideBar1000, position: "relative", height: "592px" })

        }

        if (screenWidth < desktopView && document.activeElement.id !== "SideSearch") {
            setSideNavDisplay({ display: false })
            setSideNavstate({ ...fixedSideBarPhoneView })
        } else if (screenWidth > desktopView) {
            setSideNavDisplay({ display: true })
        }

    }
    let style = { ...sideNavstate }

    const onChange = (e) => {
        const data = e.target.value
        const indexed = store.filter(cat => cat.name.toLowerCase().indexOf(data.toLowerCase()) > -1)
        const searchedCat = indexed.map(items => {
            return <div key={items.id}>
                <NavLink to={`/categories/${items.id}/${items.name}`}><p>{items.name}</p></NavLink>
            </div>
        })
        setSearch({ searching: true, data: data, searched: searchedCat })
    }


    // const onClick = (e) => {
    //      setSideNavDisplay({ display: false })
    // }



    if (store != undefined || store == "") {
        category = store.map(items => {
            return <div key={items.id}>
                <NavLink to={`/categories/${items.id}/${items.name}`}><p>{items.name}</p></NavLink>
            </div>

        })
        if (searchState.searched.length > 0) {
            category = searchState.searched
        } else if (searchState.searched.length == 0 && searchState.data.length > 0) {
            category = <p className="Notfound">No Match Found</p>
        }
    } else {
        category = <Fragment />
    }

    useEffect(() => {

    }, [searchState]);

    return (
        <Fragment>
            <div id="toggle" onClick={onclick} className="toggle">
                <span></span>
                <span></span>
                <span className="last"></span>
            </div>
            <div className="sideNav" style={{
                ...style, display: Display
            }}>
                <h3>CATEGORIES</h3>
                <button onClick={onclick} id="close" className="close">&times;</button>
                <input type="search" onChange={onChange} name="" id="SideSearch" placeholder="Search categories" />
                {category}
            </div>
        </Fragment>

    );
};


SideNav.propTypes = {

};


export default SideNav;
