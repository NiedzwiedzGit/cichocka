import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './ImagesBlock.css';
const imagesBlock = (props) => {
    console.log('[ImagesBlock] ' + props.url.slice(0, -4));

    return (
        < div className={classes.ImagesBlock}>
            <Link to={props.url.slice(0, -4)}>
                < img src={'images/' + props.url} alt="MyBurger" />
            </Link>
            <p><strong>Architects</strong>: G+F Arquitectos</p>
            <p><strong>Location</strong>: Madrid, Spain</p>
            <p><strong>Year</strong>: 2019</p>
            <p><strong>Photographs</strong>: Joaquín Mosquera Casares</p>
        </div>
    );
};
export default withRouter(imagesBlock);