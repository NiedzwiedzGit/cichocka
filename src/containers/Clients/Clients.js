import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import classes from './Clients.css';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

class Clients extends Component {
    render() {
        return (
            <div className={classes.Clients}>
                <Button
                    btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                    clicked={this.props.onAddNewPost} />

                <p>Clients</p>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clients));