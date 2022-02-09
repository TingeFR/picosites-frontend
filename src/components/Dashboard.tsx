import { CSSProperties, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect, DispatchProp } from 'react-redux'
import { Text, Colors, Spinner, Card, H5, Tag, ButtonGroup, Divider } from "@blueprintjs/core";
import moment from 'moment';
import { i18n } from '../assets/i18n/i18n';
import { User } from '../api/user';
import { i18n_fr } from '../assets/i18n/i18n_fr';
import { Project } from '../api/project';
import TopBar from './TopBar';

interface DashboardProps {
  i18n: i18n,
  user: User,
  isLoading: boolean,
}

const Dashboard:FC<DashboardProps & DispatchProp> = (props) => {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles: {[key: string]: CSSProperties} = {
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
    spinnerContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }

  const [i18n, seti18n] = useState(i18n_fr)
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)
  let navigate = useNavigate()

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  useEffect(() => {
    setIsLoading(props.isLoading)
  }, [props.isLoading])

  const handleClick = (path: string) => {
    navigate(path)
  }

  const isProjectActive = (project: Project) => {
    const today = moment()
    const diff = today.diff(project.expirationDate)
    return(diff < 0)
  }

  const expirationPhrase = (project: Project) => {
    const test = moment(project.expirationDate)
    return `${isProjectActive(project) ? i18n.expires_on : i18n.expired_on} ${test.format('LL')}`
  }

  return (
    <div id="dashboard" style={styles.dashboard}>
      {isDesktop ? "" : <div id="bar" style={{width: "100vw", height: constants.LOGOBAR_SIZE}}></div>}
      <div id="dashboardContainer" style={styles.dashboardContainer}>
          {isLoading === false ?
            <div>
              <TopBar title={i18n.projects} />
              {
                user ? user.projects ? user.projects.map(project => 
                  <Card interactive key={project.id} style={{margin: 24, padding: 0}} onClick={() => {handleClick(`/projects/${project.id}`)}}>
                    <div style={{display: "flex", alignItems: "center", padding: 16, paddingBottom: 12}}>
                      <H5 style={{marginTop: 8}}>{project.name}</H5>
                      <Tag minimal round intent={isProjectActive(project) ? "success" : "danger"} style={{marginLeft: 8}}>
                        {isProjectActive(project) ? i18n.active : i18n.expired}
                      </Tag>
                    </div>
                    <Divider style={{margin: 0}}/>
                    <div style={{display: "flex", alignItems: "center", padding: 16, paddingBottom: 12}}>
                      <p style={{opacity: 0.6}}>{expirationPhrase(project)}</p>
                    </div>
                  </Card>
                ) : "" : ""
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

const mapStateToProps = (state: any) => {
  return {
    i18n: state.i18n,
    isLoading: state.isLoading,
    user: state.user,
  }
}

export default connect(mapStateToProps)(Dashboard);