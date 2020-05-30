import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Main from '../../containers/Main/Main';
import axios from 'axios';

import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 30% auto;
  border-color: red;
`;


class Layout extends Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerToggleHamdler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        console.log('[Leyout] ' + this.props.loading);
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHamdler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                {!this.props.loading ?
                    <Main />
                    : <CircleLoader
                        css={override}
                        size={150}
                        color={"grey"}
                        loading={true}
                    />}


                {/* <main className={classes.Content}>
                    {this.props.children}
                </main> */}
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        imageContentPath: state.main.imageContentPath,
        loading: state.main.loading,
        imageContentFullPath: state.main.imageContentFullPath,
    };
};

export default connect(mapStateToProps)(Layout);