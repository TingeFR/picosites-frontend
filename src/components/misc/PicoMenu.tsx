import { CSSProperties, FC, useEffect, useState } from 'react';
import { ReactCookieProps, withCookies } from "react-cookie";
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { constants } from '../../assets/utils'
import { connect, DispatchProp } from 'react-redux'
import { Menu, MenuDivider, MenuItem, Icon, Text } from '@blueprintjs/core';
import { i18n } from '../../assets/i18n/i18n';
import { User } from '../../api/types/user';
import { i18n_fr } from '../../assets/i18n/i18n_fr';

interface PicoMenuProps {
  i18n: i18n,
  user: User,
  variant: 'desktop' | 'mobile',
  menuClose?: () => void
}

const PicoMenu:FC<PicoMenuProps & DispatchProp & ReactCookieProps> = (props) => {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles: {[key: string]: CSSProperties} = {
    menu: {
      width: "100%",
      height: "100%",
      background: "white",
      paddingTop: 16,
    },
    userItem: {
      width: "100%",
      height: 40,
      margin: 24,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      userSelect: "none",
    },
  }

  const [i18n, seti18n] = useState(i18n_fr)
  const [user, setUser] = useState<User>()
  const [view, setView] = useState("")
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  useEffect(() => {
    setView(location.pathname)
  }, [location])

  const handleClick = (path: string) => {
    navigate(path)
    if(props.variant === "mobile"){
      if(props.menuClose){
        props.menuClose()
      }
    }
  }

  const handleLogout = () => {
    props.cookies?.remove("token")
    props.cookies?.remove("user")
    window.location.href = "/"
  }

  return (
    <Menu className="picoMenu" large style={styles.menu}>
      <MenuItem className="picoMenuItem" icon="home" text={i18n.dashboard} onClick={() => {handleClick('/dashboard')}} active={view === "/" || view === "/dashboard"}/>
      <MenuDivider className="picoMenuDivider" title={i18n.projects}/>
      {
        user ? user.projects ? user.projects.map(project => 
          <MenuItem className="picoMenuItem" text={project.name} onClick={() => {handleClick(`/projects/${project.id}`)}} active={view === `/projects/${project.id}`}/>
        ) : "" : ""
      }
      <MenuDivider/>
      <MenuItem className="picoMenuItem" icon="chat" text={i18n.requests} onClick={() => {handleClick('/requests')}} active={view === "/requests"}/>
      <MenuItem className="picoMenuItem" icon="style" text={i18n.content} onClick={() => {handleClick('/content')}} active={view === "/content"}/>
      {isDesktop ?
        ""
      :
        <div>
          <MenuDivider/>
          <div id="userItem" style={styles.userItem}>
            <Icon icon="user" color="#311b60" size={30}/>
            <Text style={{marginLeft: 12}}>{`${user?.firstName} ${user?.lastName}`}</Text>
          </div>
          <MenuItem className="picoMenuItem" icon="cog" text={i18n.settings}/>
          <MenuItem className="picoMenuItem" icon="log-out" text={i18n.logout} onClick={() => handleLogout()}/>
        </div>
      }
    </Menu>
  );
}

const mapStateToProps = (state: any) => {
  return {
    i18n: state.i18n,
    user: state.user,
  }
}

export default connect(mapStateToProps)(withCookies(PicoMenu));