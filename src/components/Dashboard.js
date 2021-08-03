import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect } from 'react-redux'
import { Text, Colors, Spinner, Card } from "@blueprintjs/core";
import TopBar from './TopBar';

function Dashboard(props) {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles = {
    dashboard: {
      width: isDesktop ? `calc(100vw - ${constants.SIDEBAR_SIZE}px)` : "100%",
      marginLeft: isDesktop ? constants.SIDEBAR_SIZE : 0,
      height: "100%",
      background: Colors.LIGHT_GRAY5,
    },
    dashboardContainer: {
      height: isDesktop ? "100%" : `calc(100vh - ${constants.LOGOBAR_SIZE}px)`,
      overflowY: "auto",
    },
    spinnerContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }

  const [i18n, seti18n] = useState({})
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(undefined)

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  useEffect(() => {
    setIsLoading(props.isLoading)
  }, [props.isLoading])

  return (
    <div id="dashboard" style={styles.dashboard}>
      {isDesktop ? "" : <div id="bar" style={{width: "100vw", height: constants.LOGOBAR_SIZE}}></div>}
      <div id="dashboardContainer" style={styles.dashboardContainer}>
        {isLoading === undefined ? "" :
          isLoading === false ?
            <div>
            <TopBar/>
            {
              user ? user.projects.map(project => <Card key={project.id}>{project.name}</Card>) : ""
            }
            </div>
          :
            <div id="spinnerContainer" style={styles.spinnerContainer}>
              <Spinner size={80}/>
            </div>
          }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    isLoading: state.isLoading,
    user: state.user,
  }
}

export default connect(mapStateToProps)(Dashboard);