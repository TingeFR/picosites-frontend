import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { connect } from 'react-redux'
import { constants } from '../assets/utils'
import { Button, Card, Elevation, InputGroup } from "@blueprintjs/core";
import { Colors } from "@blueprintjs/core";
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
      marginTop: isDesktop ? 56 : 0,
      width: isDesktop ? 460 : "100%",
      height: 700,
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
        <InputGroup type="email" placeholder="Email" style={styles.loginFormElement}/>
        <InputGroup type="password" placeholder="Password" style={styles.loginFormElement}/>
        <Button minimal fill className="picoButton" style={styles.loginFormElement}>{i18n.login}</Button>
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