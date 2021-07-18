import { Text } from "@blueprintjs/core";
import { Colors } from "@blueprintjs/core";

function NotFound(props) {

  const styles = {
    notFound: {
      width: "100%",
      height: "100%",
      backgroundColor: Colors.LIGHT_GRAY5
    }
  }

  return (
    <div id="notFound" style={styles.notFound}>
        <Text>404 Not Found</Text>
    </div>
  );
}

export default NotFound;