import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Login from "./Login";
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import { Menu, MenuItem } from '@blueprintjs/core';

function RedirectToHome() {
  return(
    <Redirect to="/"/>
  )
}

function Main(props) {

  const styles = {
    mainContainer: {
      position: "fixed",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0
    }
  }

  useEffect(() => {
    _i18nSetLanguage("en")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const _i18nSetLanguage = (lang) => {
    const action = { type: "I18N_SET_LANGUAGE", value: lang }
    props.dispatch(action)
  }

  return (
    <div id="mainContainer" style={styles.mainContainer}>
      <Router style={styles.router}>
        {/* <Menu>
          <MenuItem icon="new-link" text="New link" />
        </Menu> */}
        <Switch>
          <Route exact path="/" component={props.isLoggedIn ? "" : Login} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(Main);