import { CSSProperties, FC, useEffect, useState } from 'react';
import { ReactCookieProps, withCookies } from "react-cookie";
import { useMediaQuery } from 'react-responsive'
import { constants } from '../../assets/utils'
import { connect, DispatchProp } from 'react-redux'
import { Button, Callout, Card, Elevation, InputGroup } from "@blueprintjs/core";
import { Text, Colors } from "@blueprintjs/core";
import PicoSitesLogo from "../../assets/svg/PicoSitesLogo"

import { postAuthLogin } from '../../api/server';
import { i18n } from '../../assets/i18n/i18n';
import { i18n_fr } from '../../assets/i18n/i18n_fr';

interface LoginViewProps {
  i18n: i18n
}

const LoginView:FC<LoginViewProps & DispatchProp & ReactCookieProps> = (props) => {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles: {[key: string]: CSSProperties} = {
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
      height: isDesktop ? 560 : "100%",
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

  const [i18n, seti18n] = useState(i18n_fr)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = "PicoSites"
  }, [])

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  const changeEmail = (event: any) => {
    setError(false)
    setEmail(event.target.value)
  }

  const changePassword = (event: any) => {
    setError(false)
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    const postAuthLoginResult = await postAuthLogin(email, password).catch((e) => {
      setError(true)
    })
    if(postAuthLoginResult){
      props.cookies?.set("token", postAuthLoginResult.token, {path: "/"});
      props.cookies?.set("user", email, {path: "/"});
      window.location.href = "/"
    }
  }

  const handleLoginByKey = async (event: any) => {
    if(event.key === "Enter"){
      handleLogin()
    }
  }

  return (
    <div id="login" style={styles.login}>
      <Card style={styles.loginCard} elevation={Elevation.TWO}>
        <div id="loginLogoContainer" style={styles.loginLogoContainer}>
          <PicoSitesLogo style={styles.loginLogo}/>
        </div>
        { error ? <Callout intent="danger">{i18n.login_error}</Callout> : ""}
        <InputGroup type="email" placeholder={i18n.email} style={styles.loginFormElement} value={email} onChange={changeEmail} onKeyDown={handleLoginByKey}/>
        <InputGroup type="password" placeholder={i18n.password} style={styles.loginFormElement} value={password} onChange={changePassword} onKeyDown={handleLoginByKey}/>
        <Button minimal fill className="picoButton" style={styles.loginFormElement} onClick={handleLogin}>{i18n.login}</Button>
        <div style={{flexGrow: 1}}></div>
        <Text id="loginFooter" style={styles.loginFooter}>©2021 PicoSites</Text>
      </Card>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    i18n: state.i18n,
  }
}

export default connect(mapStateToProps)(withCookies(LoginView));