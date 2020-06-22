import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';
import classes from './ImagesBlock.css';
const imagesBlock = (props) => {

    return (
        < div className={[classes.ImagesBlock, classes[props.close]].join(' ')}>

            <Link to={props.url}>
                {/* .slice(0, -4) */}
                {/* < img src={'images/' + props.url} alt="MyBurger" /> */}
                < img src={props.url} alt="MyBurger" />
            </Link><br />
           {props.auth? <div className={classes.ImagesBlockBtnSwipe}>
                <ButtonBootstrap variant="outline-danger" onClick={props.clicked}>Remove</ButtonBootstrap>
                <ButtonBootstrap variant="outline-primary" onClick={props.clickedUpdate}>Update</ButtonBootstrap>
            </div>:null}
            <p><strong>Architects</strong>: {props.architects}</p>
            <p><strong>Location</strong>: {props.locationCountry}, {props.locationRegion}</p>
            <p><strong>Year</strong>: {props.year}</p>
            <p><strong>Photographs</strong>: Joaquín Mosquera Casares</p>

        </div>
    );
};
export default withRouter(imagesBlock);