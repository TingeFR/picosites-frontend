import { CSSProperties, FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { constants } from '../assets/utils'
import { connect, DispatchProp } from 'react-redux'
import { Colors } from "@blueprintjs/core";
import { i18n } from '../assets/i18n/i18n';
import { i18n_fr } from '../assets/i18n/i18n_fr';

interface NotFoundProps {
  i18n: i18n
}

const NotFound:FC<NotFoundProps & DispatchProp> = (props) => {

  const isDesktop = useMediaQuery({ minWidth: constants.DESKTOP_TO_MOBILE + 1 })

  const styles: {[key: string]: CSSProperties} = {
    notfound: {
      width: isDesktop ? `calc(100vw - ${constants.SIDEBAR_SIZE}px)` : "100%",
      marginLeft: isDesktop ? constants.SIDEBAR_SIZE : 0,
      height: "100%",
      background: Colors.LIGHT_GRAY5,
    },
    notfoundContainer: {
      height: isDesktop ? "100%" : `calc(100vh - ${constants.LOGOBAR_SIZE}px)`,
      overflowY: "auto",
    },
  }

  const [i18n, seti18n] = useState(i18n_fr)

  useEffect(() => {
    seti18n(props.i18n)
  }, [props.i18n])

  return (
    <div id="notfound" style={styles.notfound}>
      {isDesktop ? "" : <div id="bar" style={{width: "100vw", height: constants.LOGOBAR_SIZE}}></div>}
      <div id="notfoundContainer" style={styles.notfoundContainer}>
        404 Not Found
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    i18n: state.i18n
  }
}

export default connect(mapStateToProps)(NotFound);