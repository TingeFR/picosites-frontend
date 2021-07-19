import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect } from 'react-redux'
import { Button, Card, Elevation, InputGroup } from "@blueprintjs/core";
import { Text, Colors } from "@blueprintjs/core";
import PicoSitesLogo from "../assets/svg/PicoSitesLogo"

function Login(props) {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles = {
    login: {
      width: "100%",
      height: "100%",
      background: Colors.LIGHT_GRAY5,
      display: "flex",
      justifyContent: "center",
      overflow: "auto",
    },
    loginCard: {
      display: "flex",
      flexDirection: "column",
      marginTop: isDesktop ? 56 : 0,
      width: isDesktop ? 460 : "100%",
      height: 560,
    },
    loginLogoContainer: {
      width: "100%",
      height: 64,
      marginTop: 54,
      marginBottom: 54,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loginLogo: {
      width: 300,
      height: 60,
    },
    loginFormElement: {
      height: 48,
      padding: 24,
      marginTop: 16
    },
    loginFooter: {
      width: "100%",
      height: 30,
      textAlign: "center",
    }
  }

  const [i18n, seti18n] = useState({})

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  return (
    <div id="login" style={styles.login}>
      <Card style={styles.loginCard} elevation={Elevation.TWO}>
        <div id="loginLogoContainer" style={styles.loginLogoContainer}>
          <PicoSitesLogo style={styles.loginLogo}/>
        </div>
        <InputGroup type="email" placeholder={i18n.email} style={styles.loginFormElement}/>
        <InputGroup type="password" placeholder={i18n.password} style={styles.loginFormElement}/>
        <Button minimal fill className="picoButton" style={styles.loginFormElement}>{i18n.login}</Button>
        <div style={{flexGrow: 1}}></div>
        <Text id="loginFooter" style={styles.loginFooter}>©2021 PicoSites</Text>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}

export default connect(mapStateToProps)(Login);