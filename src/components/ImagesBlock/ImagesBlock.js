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
        let content = null;
        let imageVar = (
            <div className={classes.ImagesBlockPicture} >
                <img
                    src={this.props.url}
                    onClick={this.props.clickedOn}
                    alt="MyBurger" />
            </div>
        );
        switch (this.props.page) {
            case 'NewsMedia':
                content = (
                    <div className={classes.ImagesBlockText}>
                        <p> <strong>Description</strong>:  {this.props.describeData} </p>
                        <p><strong>URL</strong>: <a href={this.props.webAddress}>{this.props.webAddress}</a></p>
                    </div>)

                break;
            case 'Main':
                content = (
                    <div className={classes.ImagesBlockText}>
                        <p> <strong>Architects</strong>: {this.props.architecture} </p>
                        <p><strong>Location</strong>: {this.props.locationCountry}</p>
                        <p><strong>Year</strong>: {this.props.year}</p>
                        <p><strong>Photographs</strong>: {this.props.photographs}</p>
                    </div>)

                break;
            case 'Info':
                imageVar = null;
                content = (
                    <div className={classes.ImagesBlockText}>
                        <p className={classes.TextArea}>{this.props.text}</p>
                    </div>)

                break;
        }
        return (

            <div className={[classes.ImagesBlock, classes[this.props.close]].join(' ')} >
                <div className={classes.ImagesBlockLine}></div>
                {imageVar}
                <br />
                {
                    this.props.auth ? <div className={classes.ImagesBlockBtnSwipe}>
                        <ButtonBootstrap variant="outline-danger" onClick={this.props.clicked}>Remove</ButtonBootstrap>
                        <ButtonBootstrap variant="outline-primary" onClick={this.props.clickedUpdate}>Update</ButtonBootstrap>
                    </div > : null
                }
                {content}

            </div >
        );
    }

};

export default ImagesBlock;