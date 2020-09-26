import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './NewsMedia.css';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

class NewsMedia extends Component {
    render() {
        return (
            <div className={classes.NewsMedia}>
                <p>NewsMedia</p>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {


    };
};
const mapDispatchToProps = dispatch => {
    return {

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsMedia));