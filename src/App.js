import React, { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';

const asyncAuth = asyncComponent(() => {
  return import('./components/ImagesBlock/ImagesBlockContent/ImagesBlockContent');

});

class App extends Component {
  render() {
    let routes = (
      <Switch>
        {/* <Route path="/postGalery" component={asyncAuth} /> */}
        {/* <Route path="/" exact component={BurgerBuilder} /> */}
        <Redirect to="/" />
      </Switch>
    );
    console.log("test App");
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapstateToProps = state => {
  return {
    //isAuthenticated: state.auth.token !== null
  };
};

const dispatchToProps = dispatch => {
  return {
    //  onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapstateToProps, dispatchToProps)(App));
