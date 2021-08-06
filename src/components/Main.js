import React, { useEffect, useState } from 'react';
import { withCookies } from "react-cookie";
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect } from 'react-redux'
import { Redirect, BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { HamburgerSlider } from 'react-animated-burgers';
import { Transition } from 'react-transition-group';
import Login from "./Login";
import NotFound from './NotFound';
import PicoSitesLogo from '../assets/svg/PicoSitesLogo';
import Dashboard from './Dashboard';
import { getUserByEMail } from '../api/server';
import PicoMenu from './PicoMenu';

const RedirectToHome = () => <Redirect to="/"/>

function Main(props) {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles = {
    mainContainer: {
      position: "fixed",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 0,
    },
    mainSidebar: {
      position: "absolute",
      width: constants.SIDEBAR_SIZE,
      height: "100%",
      left: 0,
      top: 0,
      borderRight: "1px solid rgba(24, 32, 38, 0.2)",
      zIndex: 0,
    },
    logoBar: {
      width: "100%",
      height: constants.LOGOBAR_SIZE,
      display: "flex",
      background: "white",
    },
    burger: {
      width: 30,
      height: 30,
      margin: 16,
      marginRight: 36,
    },
    logo: {
      width: 150,
      margin: 24,
    },
    overlay: {
      position: "absolute",
      width: "100%",
      height: `calc(100vh - ${constants.LOGOBAR_SIZE}px)`,
      top: constants.LOGOBAR_SIZE,
      left: 0,
      zIndex: 1,
      background: "white",
      borderTop: "1px solid rgba(24, 32, 38, 0.1)",
    }
  }

  const [i18n, seti18n] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)
  const [burgerIn, setBurgerIn] = useState(false)

  useEffect(() => {
    _i18nSetLanguage("fr")
    getData()
    console.log(process.env.NODE_ENV)
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
      const cookieUser = props.cookies.get("user")
      const getUserByEMailResult = await getUserByEMail(cookieToken, cookieUser).catch((e) => {})
      _setUser(getUserByEMailResult)
      _setLoading(false)
    }
    else{
      _setLoggedIn(false)
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

  const _setUser = (value) => {
    const action = { type: "SET_USER", value: value }
    props.dispatch(action)
  }

  const _setLoading = (value) => {
    const action = { type: "SET_LOADING", value: value }
    props.dispatch(action)
  }

  const handleBurger = () => {
    setBurgerIn(!burgerIn)
  }

  const handleLogo = () => {
    window.location.href = "/"
  }

  // MENU

  const duration = 200;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    height: 0,
  }
  
  const transitionStyles = {
    entering: { opacity: 1, visibility: "visible" },
    entered:  { opacity: 1, visibility: "visible" },
    exiting:  { opacity: 0, visibility: "visible" },
    exited:  { opacity: 0, visibility: "hidden" },
  };

  return (
    <div id="mainContainer" style={styles.mainContainer}>
      <Router style={styles.router}>

        {isLoggedIn ?
          isDesktop ?
            <div id="mainSidebar" style={styles.mainSidebar}>
              <div id="logoBar" style={styles.logoBar}>
                <div id="logo" style={styles.logo}>
                  <PicoSitesLogo style={{cursor: "pointer"}} onClick={handleLogo}/>
                </div>
              </div>
              <PicoMenu/>
            </div>
          :
          <div style={{position: "absolute", zIndex: 2, width: "100%"}}>
            <div id="logoBar" style={styles.logoBar}>
              <div id="logo" style={styles.logo}>
                <PicoSitesLogo style={{cursor: "pointer"}} onClick={handleLogo}/>
              </div>
              <div style={{flexGrow: 1}}></div>
              <div id="burger" style={styles.burger}>
                <HamburgerSlider barColor="#311b60" buttonWidth={30} isActive={burgerIn} toggleButton={handleBurger}/>
              </div>
            </div>
            <Transition in={burgerIn} timeout={duration}>
              {state => (
                <div style={{...defaultStyle, ...transitionStyles[state], ...styles.overlay}}>
                  <PicoMenu variant="mobile" menuClose={() => setBurgerIn(false)}/>
                </div>
              )}
            </Transition>
          </div>
        : ""}

        <Switch>
          <Route exact path="/" component={isLoggedIn ? Dashboard : Login} />
          <Route path="/dashboard" component={isLoggedIn === undefined ? "" : isLoggedIn === true ? Dashboard : RedirectToHome} />
          <Route component={isLoggedIn === undefined ? "" : isLoggedIn === true ? NotFound : RedirectToHome} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    i18n: state.i18n,
    user: state.user,
  }
}

export default connect(mapStateToProps)(withCookies(Main));