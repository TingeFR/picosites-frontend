import { CSSProperties, FC, useEffect, useState } from 'react';
import { i18n } from '../assets/i18n/i18n';
import { i18n_fr } from '../assets/i18n/i18n_fr';
import { ReactCookieProps, withCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect, DispatchProp } from 'react-redux'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { HamburgerSlider } from 'react-animated-burgers';
import { Transition } from 'react-transition-group';
import PicoSitesLogo from '../assets/svg/PicoSitesLogo';
import { getUserByEMail } from '../api/server';
import PicoMenu from './PicoMenu';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import Login from "./Login";
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import ProjectView from './ProjectView';
import { User } from '../api/user';

interface MainProps {
  i18n: i18n,
  isLoggedIn: 0 | 1 | 2,
}

const RedirectToHome = () => <Navigate to="/"/>
const RedirectTo404 = () => <Navigate to="/404"/>

const Main:FC<MainProps & DispatchProp & ReactCookieProps> = (props) => {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles: {[key: string]: CSSProperties} = {
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

  const [i18n, seti18n] = useState(i18n_fr)
  const [isLoggedIn, setIsLoggedIn] = useState(0)
  const [burgerIn, setBurgerIn] = useState(false)

  useEffect(() => {
    _i18nSetLanguage("fr")
    moment.locale("fr")
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    seti18n(props.i18n)
    moment.locale(props.i18n.locale)
  }, [props.i18n])

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn)
  }, [props.isLoggedIn])

  const getData = async () => {
    const cookieToken = props.cookies?.get("token")
    if(cookieToken){
      _setLoggedIn(2)
      const cookieUser = props.cookies?.get("user")
      const getUserByEMailResult = await getUserByEMail(cookieToken, cookieUser)
      _setUser(getUserByEMailResult)
      _setLoading(false)
    }
    else{
      _setLoggedIn(1)
    }
  }

  const _i18nSetLanguage = (value: string) => {
    const action = { type: "I18N_SET_LANGUAGE", value: value }
    props.dispatch(action)
  }

  const _setLoggedIn = (value: 0 | 1 | 2) => {
    const action = { type: "SET_LOGGEDIN", value: value }
    props.dispatch(action)
  }

  const _setUser = (value: User) => {
    const action = { type: "SET_USER", value: value }
    props.dispatch(action)
  }

  const _setLoading = (value: boolean) => {
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
  
  const transitionStyles: {[key: string]: CSSProperties} = {
    entering: { opacity: 1, visibility: "visible" },
    entered:  { opacity: 1, visibility: "visible" },
    exiting:  { opacity: 0, visibility: "visible" },
    exited:  { opacity: 0, visibility: "hidden" },
  };

  return (
    <div id="mainContainer" style={styles.mainContainer}>
      <BrowserRouter>
        {isLoggedIn === 2 ?
          isDesktop ?
            <div id="mainSidebar" style={styles.mainSidebar}>
              <div id="logoBar" style={styles.logoBar}>
                <div id="logo" style={styles.logo}>
                  <PicoSitesLogo style={{cursor: "pointer"}} onClick={handleLogo}/>
                </div>
              </div>
              <PicoMenu variant="desktop"/>
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
              {(state: 'entering'|'entered'|'exiting'|'exited') => (
                <div style={{...defaultStyle, ...transitionStyles[state], ...styles.overlay}}>
                  <PicoMenu variant="mobile" menuClose={() => setBurgerIn(false)}/>
                </div>
              )}
            </Transition>
          </div>
        : ""}

        <Routes>
          <Route path="/" element={isLoggedIn === 2 ? <Dashboard/> : <Login/>} />
          <Route path="/dashboard" element={isLoggedIn === 0 ? "" : isLoggedIn === 2 ? <Dashboard/> : <RedirectToHome/>} />
          <Route path="/projects/:projectId" element={isLoggedIn === 0 ? "" : isLoggedIn === 2 ? <ProjectView/> : <RedirectToHome/>} />
          <Route path="/404" element={isLoggedIn === 0 ? "" : isLoggedIn === 2 ? <NotFound/> : <RedirectToHome/>} />
          <Route path="*" element={isLoggedIn === 0 ? "" : isLoggedIn === 2 ? <RedirectTo404/> : <RedirectToHome/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state: any) => {
    return {
      isLoggedIn: state.isLoggedIn,
      i18n: state.i18n,
      user: state.user
    }
  }
  
export default connect(mapStateToProps)(withCookies(Main))