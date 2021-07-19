import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect } from 'react-redux'
import Login from "./Login";
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import PicoSitesLogo from '../assets/svg/PicoSitesLogo';

function RedirectToHome() {
  return(
    <Redirect to="/"/>
  )
}

function Main(props) {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles = {
    mainContainer: {
      position: "fixed",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0
    },
    mainSidebar: {
      position: "absolute",
      width: isDesktop ? 256 : "100%",
      height: "100%",
      left: 0,
      top: 0,
      bottom: 0,
      background: "white",
      borderRight: "1px solid rgba(24, 32, 38, 0.2)"
    },
    mainSideLogo: {
      padding: 24,
      paddingLeft: 20,
    },
  }

  const [i18n, seti18n] = useState({})

  useEffect(() => {
    _i18nSetLanguage("fr")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  const _i18nSetLanguage = (lang) => {
    const action = { type: "I18N_SET_LANGUAGE", value: lang }
    props.dispatch(action)
  }

  return (
    <div id="mainContainer" style={styles.mainContainer}>
      <Router style={styles.router}>
        <div id="mainSidebar" style={styles.mainSidebar}>
          <Menu className="picoMenu" large>
            <div id="mainSideLogo" style={styles.mainSideLogo}><PicoSitesLogo/></div>
            <MenuItem className="picoMenuItem" icon="home" text={i18n.overview}/>
            <MenuDivider className="picoMenuDivider" title={i18n.projects}/>
            <MenuItem className="picoMenuItem" text="Projet 1"/>
            <MenuDivider/>
            <MenuItem className="picoMenuItem" icon="chat" text={i18n.requests}/>
            <MenuItem className="picoMenuItem" icon="edit" text={i18n.fields}/>
          </Menu>
        </div>
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
    isLoggedIn: state.isLoggedIn,
    i18n: state.i18n
  }
}

export default connect(mapStateToProps)(Main);