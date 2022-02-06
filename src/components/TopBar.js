import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from "react-cookie";
import { useMediaQuery } from 'react-responsive';
import { constants } from '../assets/utils'
import { connect } from 'react-redux'
import { Icon, Text, Button, Menu, MenuDivider, MenuItem, Breadcrumbs } from '@blueprintjs/core';
import { Classes, Popover2 } from "@blueprintjs/popover2";

function TopBar(props) {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles = {
    topBar: {
      width: "100%",
      height: isDesktop ? 96 : 48,
      display: "flex",
    },
    topText: {
      height: 40,
      lineHeight: "40px",
      margin: 36,
      marginTop: isDesktop ? 32 : 16,
    },
    userItem: {
      width: 240,
      height: 40,
      margin: 36,
      marginTop: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      userSelect: "none",
    },
  }

  const [i18n, seti18n] = useState({})
  const [user, setUser] = useState({})
  const [popMenu, setPopMenu] = useState(false)

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  const handlePopMenu = () => {
    setPopMenu(!popMenu)
  }

  const handleInteraction = nextOpenState => {
    setPopMenu(nextOpenState)
  }

  const handleLogout = () => {
    props.cookies.remove("token")
    props.cookies.remove("user")
    window.location.href = "/"
  }

  const handleClick = (event, path) => {
    event.preventDefault()
    props.history.push(path)
  }

  const breadcrumbItem = text => {
    return <h5 style={{fontSize: isDesktop ? 24 : 16, textOverflow: "ellipsis"}}>{text}</h5>
  }

  return (
    <div id="topbar" style={styles.topBar}>
      <div style={styles.topText}>
      <Breadcrumbs
        collapseFrom="start"
        minVisibleItems={1}
        items={
          !props.item ? [{text: breadcrumbItem(props.title), href: "/dashboard"}] :
          [{text: breadcrumbItem(props.title), href: "/dashboard", onClick: event => handleClick(event, "/dashboard")}, {text: breadcrumbItem(props.item)}]
        }
      />
      </div>
      <div style={{flexGrow: 1}}></div>
      {isDesktop ?
        <Popover2
          minimal
          interactionKind="click"
          isOpen={popMenu}
          onInteraction={state => handleInteraction(state)}
          placement="bottom"
          content={
            <Menu className="picoMenu" style={{boxShadow: "1px 1px 6px rgba(16, 22, 26, 0.2)", marginTop: -24}}>
              <MenuItem className="picoMenuItem" icon="cog" text={i18n.settings}/>
              <MenuItem className="picoMenuItem" icon="log-out" text={i18n.logout} onClick={() => handleLogout()}/>
            </Menu>
          }
        >
          <div id="userItem" style={styles.userItem} onClick={handlePopMenu}>
            <Icon icon="user" color="#311b60" size={30}/>
            <Text style={{marginLeft: 12}}>{`${user.firstName} ${user.lastName}`}</Text>
            <Icon icon={popMenu ? "caret-up" : "caret-down"} style={{marginLeft: 8}}/>
          </div>
        </Popover2>
      :
        ""
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    user: state.user,
  }
}

export default connect(mapStateToProps)(withCookies(withRouter(TopBar)));