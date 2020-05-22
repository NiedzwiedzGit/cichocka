import React, { Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import images from '../../assets/images/cichocka.png'
import images2 from '../../assets/images/burger-logo.png'


class Main extends Component {
    render() {
        // let image = images.map(img => {
        //     console.log(img);
        // }
        // );
        return (
            <div className={classes.Main}>
                <img src={images} alt="MyBurger" />
                <img src={images2} alt="MyBurger" />
                <img src={images} alt="MyBurger" />
                <img src={images} alt="MyBurger" />
                <img src={images2} alt="MyBurger" />
                <img src={images} alt="MyBurger" />
                <img src={images} alt="MyBurger" />
                <img src={images2} alt="MyBurger" />
                <img src={images} alt="MyBurger" />
                <img src={images} alt="MyBurger" />
                <img src={images2} alt="MyBurger" />
                <img src={images} alt="MyBurger" />
            </div>
        );
    };
};


const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);