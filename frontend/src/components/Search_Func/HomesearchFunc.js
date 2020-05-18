import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
const HomeSearch = (props) => {
    return (
        <div>
            <NavLink to="/searchproduct"> <input type="text" name="search" id="search" /><button type="submit">Search</button></NavLink>
        </div>
    );
}

HomeSearch.propTypes = {

};

export default HomeSearch;
