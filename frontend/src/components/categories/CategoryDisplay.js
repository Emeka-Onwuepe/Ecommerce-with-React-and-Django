import React, { useContext,Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { storeContext } from '../../STATES/Actions/Actions';

const CategoryDisplay = (props) => {
    const { storestate } = useContext(storeContext);

    const { store } = storestate
    let category = ""

    if (store != undefined || store == "") {
        category = store.map(items => {
            return <div key={items.id}>
                <NavLink to={`/categories/${items.id}/${items.name}`}><p>{items.name}</p></NavLink>
            </div>
        })
    } else {
        category = <Fragment />
    }



    return (
        <div>
            {category}
        </div>
    );
};


CategoryDisplay.propTypes = {

};


export default CategoryDisplay;
