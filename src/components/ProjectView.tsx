import { CSSProperties, FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect, DispatchProp } from 'react-redux'
import { Text, Icon, Colors, Spinner, Card, Button, AnchorButton } from "@blueprintjs/core";
import TopBar from './TopBar';
import moment from 'moment';
import { i18n } from '../assets/i18n/i18n';
import { User } from '../api/user';
import { i18n_fr } from '../assets/i18n/i18n_fr';
import { Project } from '../api/project';

interface ProjectProps {
  i18n: i18n,
  user: User,
  isLoading: boolean,
}

const ProjectView:FC<ProjectProps & DispatchProp> = (props) => {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles: {[key: string]: CSSProperties} = {
    project: {
      width: isDesktop ? `calc(100vw - ${constants.SIDEBAR_SIZE}px)` : "100%",
      marginLeft: isDesktop ? constants.SIDEBAR_SIZE : 0,
      height: "100%",
      background: Colors.LIGHT_GRAY5,
    },
    projectContainer: {
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
    projectPanels: {
      width: "100%",
      display: "flex",
      flexDirection: isDesktop ? "row" : "column",
      alignItems: "flex-start"
    },
    projectAside: {
      width: isDesktop ? 300 : "calc(100% - 48px)",
      margin: 24,
      marginLeft: isDesktop ? 0 : 24,
    },
    projectAsideCard: {
      width: "100%",
    },
    deliveryCard: {
      width: "calc(100% - 48px)",
      margin: 24,
      padding: 0,
      borderRadius: 12,
      background: "#FFFFFF",
      flex: 1,
    },
    deliveryHeader: {
      width: "calc(100% + 4px)",
      margin: -2,
      height: 50,
      padding: 16,
      display: "flex",
      alignItems: "center",
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    }
  }

  const [i18n, seti18n] = useState(i18n_fr)
  const [user, setUser] = useState<User>()
  const [project, setProject] = useState<Project>()
  const [isLoading, setIsLoading] = useState(true)
  let navigate = useNavigate()
  let location = useLocation()
  let params = useParams()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  useEffect(() => {
    setUser(props.user)
    getData()
  }, [props.user])

  useEffect(() => {
    setUser(props.user)
    getData()
  }, [params])

  useEffect(() => {
    setIsLoading(props.isLoading)
  }, [props.isLoading])

  const handleClick = (path: string) => {
    navigate(path)
  }

  const getData = () => {
    const { projectId } = params
    if(props.user && props.user.projects){
      const dataProject = props.user.projects.find(p => p.id.toString() === projectId)
      if(dataProject){
        setProject(dataProject)
      }
    }
  }

  const getDeliveryPhrase = (delivery: string) => {
    if(project){
      const today = moment()
      const diff = today.diff(project.expirationDate)
      return(diff < 0)
    }
  }

  return (
    <div id="project" style={styles.project}>
      {isDesktop ? "" : <div id="bar" style={{width: "100vw", height: constants.LOGOBAR_SIZE}}></div>}
      <div id="projectContainer" style={styles.projectContainer}>
        {isLoading === false ?
          <div>
            <TopBar title={i18n.projects} item={project ? project.name : ""}/>
            <div id="projectPanels" style={styles.projectPanels}>
              <div key={project?.id} style={{...styles.deliveryCard, border: `2px solid ${Colors.GREEN5}`}}>
                <div style={{...styles.deliveryHeader, background: Colors.GREEN5}}>
                  <Icon icon="tick-circle" color="white" size={20}/>
                  <Text style={{marginLeft: 12, color: "white", fontSize: 16}}>{`Livré : 23 septembre 2021`}</Text>
                </div>
                <Text style={{margin: 12, marginTop: 30, marginBottom: 30}}>Les modifications sont mises en ligne.</Text>
                <div style={{margin: 12, marginTop: 30, marginBottom: 30}}>
                  <Text style={{fontSize: 13, opacity: 0.6}}>Date de la commande</Text>
                  <Text style={{fontSize: 16}}>15 septembre 2021</Text>
                </div>
                <div style={{margin: 12, marginTop: 30, marginBottom: 30}}>
                  <Text style={{fontSize: 13, opacity: 0.6}}>Détails de la commande</Text>
                  <Text style={{fontSize: 16}}>Pilote</Text>
                </div>
              </div>
            <div id="projectAside" style={styles.projectAside}>
                <Card id="projectAsidePreview" style={{...styles.projectAsideCard}}>
                  <div style={{margin: 12, marginBottom: 30}}>
                    <Text style={{fontSize: 13, opacity: 0.6}}>URL du projet</Text>
                    {project?.url.length != 0 ?
                      <Text style={{fontSize: 16}}>{project?.url}</Text> :
                      <Text style={{fontSize: 16}}>Non livré</Text>
                    }
                  </div>
                  {project?.url.length != 0 ?
                    <AnchorButton fill icon="share" href={project?.url} target="_blank">Voir le site</AnchorButton> :
                    <AnchorButton fill icon="share" disabled>Voir le site</AnchorButton>
                  }
                </Card>
                <Card id="projectAsideShortcuts" style={{...styles.projectAsideCard, marginTop: 12}}>
                  <div style={{margin: 12, marginBottom: 30}}>
                    <Text style={{fontSize: 13, opacity: 0.6}}>Projet</Text>
                    <Text style={{fontSize: 16}}>{project?.name}</Text>
                  </div>
                  <div style={{margin: 12, marginTop: 30, marginBottom: 30}}>
                    <Text style={{fontSize: 13, opacity: 0.6}}>Date de création</Text>
                    <Text style={{fontSize: 16}}>{moment(project?.date).format("LL")}</Text>
                  </div>
                  <div style={{margin: 12, marginTop: 30}}>
                    <Text style={{fontSize: 13, opacity: 0.6}}>Date d'expiration</Text>
                    <Text style={{fontSize: 16}}>{moment(project?.expirationDate).format("LL")}</Text>
                  </div>
                </Card>
              </div>
            </div>
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

export default connect(mapStateToProps)(ProjectView);