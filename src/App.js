import React, { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';

// const postGalery = asyncComponent(() => {
//   return import('./components/ImagesBlock/ImagesBlockContent/ImagesBlockContent');

// });
const newsMedia = asyncComponent(() => {
  return import('./containers/NewsMedia/NewsMedia');
});
const Main = asyncComponent(() => {
  return import('./containers/Main/Main');
});
const Info = asyncComponent(() => {
  return import('./containers/Info/Info');
});
const Histories = asyncComponent(() => {
  return import('./containers/Histories/Histories');
});
const Contacts = asyncComponent(() => {
  return import('./containers/Contacts/Contacts');
});
const Clients = asyncComponent(() => {
  return import('./containers/Clients/Clients');
});
const Download = asyncComponent(() => {
  return import('./containers/Download/Download');
});

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path={'/prasa'} exact component={newsMedia} />
        <Route path={'/info'} component={Info} />
        <Route path={'/historia'} component={Histories} />
        <Route path={'/klienci'} component={Clients} />
        <Route path={'/kontakt'} component={Contacts} />
        <Route path={'/pobierz'} component={Download} />
        {/* <Route path={'/postGalery/:id'} component={postGalery} /> */}
        <Route path="/" component={Main} />
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
