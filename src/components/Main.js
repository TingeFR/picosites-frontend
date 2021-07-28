import React, { useEffect, useState } from 'react';
import { withCookies } from "react-cookie";
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect } from 'react-redux'
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import {HamburgerSqueeze} from 'react-animated-burgers';
import Login from "./Login";
import NotFound from './NotFound';
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
    mainSideLogoBar: {
      width: "100%",
      height: 60,
      display: "flex",
    },
    mainSideBurger: {
      width: 30,
      height: 30,
      margin: 16,
      marginRight: 36,
    },
    mainSideLogo: {
      width: 150,
      margin: 24,
    },
  }

  const [i18n, seti18n] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState({})
  const [burgerMenu, setBurgerMenu] = useState(false)

  useEffect(() => {
    _i18nSetLanguage("fr")
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn)
  }, [props.isLoggedIn])

  async function getData(){
    const cookieToken = props.cookies.get("token")
    if(cookieToken){
      _setLoggedIn(true)
    }
  }

  const _i18nSetLanguage = (lang) => {
    const action = { type: "I18N_SET_LANGUAGE", value: lang }
    props.dispatch(action)
  }

  const _setLoggedIn = (value) => {
    const action = { type: "SET_LOGGEDIN", value: value }
    props.dispatch(action)
  }

  const handleBurger = () => {
    setBurgerMenu(!burgerMenu)
  }

  return (
    <div id="mainContainer" style={styles.mainContainer}>
      <Router style={styles.router}>

        {isLoggedIn ?
          <div id="mainSidebar" style={styles.mainSidebar}>
            <div id="mainSideLogoBar" style={styles.mainSideLogoBar}>
              <div id="mainSideLogo" style={styles.mainSideLogo}>
                <PicoSitesLogo/>
              </div>
              <div style={{flexGrow: 1}}></div>
              {isDesktop ? "" :
                <div id="mainSideBurger" style={styles.mainSideBurger}>
                  <HamburgerSqueeze barColor="#311b60" buttonWidth={30} isActive={burgerMenu} toggleButton={handleBurger}/>
                </div>
              }
            </div>
            <Menu className="picoMenu" large>
              <MenuItem className="picoMenuItem" icon="home" text={i18n.overview}/>
              <MenuDivider className="picoMenuDivider" title={i18n.projects}/>
              <MenuItem className="picoMenuItem" text="Projet 1"/>
              <MenuDivider/>
              <MenuItem className="picoMenuItem" icon="chat" text={i18n.requests}/>
              <MenuItem className="picoMenuItem" icon="edit" text={i18n.fields}/>
            </Menu>
          </div>
         : ""}

        <Switch>
          <Route exact path="/" component={isLoggedIn ? "" : Login} />
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

export default connect(mapStateToProps)(withCookies(Main));