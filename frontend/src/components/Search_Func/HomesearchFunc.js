import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../CSS/search.css'
const HomeSearch = (props) => {
    return (
        <div className="search">
            <NavLink to="/searchproduct"> <input type="text" name="search" id="search" placeholder="Search Products and Brands" /></NavLink>
        </div>
    );
}

HomeSearch.propTypes = {

};

export default HomeSearch;
