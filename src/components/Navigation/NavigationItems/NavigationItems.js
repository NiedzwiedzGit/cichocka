import React, { Component } from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

export class NavigationItems extends Component {
    render() {
        console.log(this.props.hdr.headerTitles);
        // let i = 0;
        let headerItem = this.props.hdr.map((imt, index) => (
            <NavigationItem link={imt.title.toLowerCase()} > {imt.title}</NavigationItem >
        ));
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>NEWSY</NavigationItem>
                {headerItem}
                {this.props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
                {!this.props.isAuthenticated
                    ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                    : <NavigationItem link="/logout">Logout</NavigationItem>}
                <button onClick={this.props.onAddHeaderItem}>+</button>
            </ul>
        );
    }

};

const mapStateToProps = state => {
    return {
        hdr: state.header.headerTitles
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddHeaderItem: () => dispatch(actions.addHeaderItem())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);