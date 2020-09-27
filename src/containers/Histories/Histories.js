import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import classes from './Histories.css';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

class Histories extends Component {
    render() {
        return (
            <div className={classes.Histories}>
                <Button
                    btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                    clicked={this.props.onAddNewPost} />

                <p>Histories</p>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Histories));