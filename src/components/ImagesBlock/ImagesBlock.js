import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';
import classes from './ImagesBlock.css';

import ImagesBlockContent from '../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent';

class ImagesBlock extends Component {
    componentDidMount() {

    }
    //console.log(props);
    // clickHandler = () => {
    //     console.log("clickHandler ImgB ", this.props.urlSplit);

    //     <ImagesBlockContent
    //         urlTest={this.props.urlSplit}
    //     />
    //     return (this.props.clickedOn,)
    // }
    render() {
        return (

            <div className={[classes.ImagesBlock, classes[this.props.close]].join(' ')} >

                {/* <Link to={'/postGalery/' + props.id}> */}
                {/* .slice(0, -4) */}
                {/* < img src={'images/' + props.url} alt="MyBurger" /> */}
                <img src={this.props.url} onClick={this.props.clickedOn} alt="MyBurger" />
                {/* </Link> */}
                {/* {<ImagesBlockContent url={props.url} />} */}
                <br />
                {
                    this.props.auth ? <div className={classes.ImagesBlockBtnSwipe}>
                        <ButtonBootstrap variant="outline-danger" onClick={this.props.clicked}>Remove</ButtonBootstrap>
                        <ButtonBootstrap variant="outline-primary" onClick={this.props.clickedUpdate}>Update</ButtonBootstrap>
                    </div > : null
                }
                <p><strong>Architects</strong>: {this.props.architecture}</p>
                <p><strong>Location</strong>: {this.props.locationCountry}</p>
                <p><strong>Year</strong>: {this.props.year}</p>
                <p><strong>Photographs</strong>: {this.props.photographs}</p>

            </div >
        );
    }

};

export default ImagesBlock;