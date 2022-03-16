import Jokes from "../../components/Jokes/index.jsx";
import styles from "./Home.style.js";

function Home() {
  return (
    <div style={styles.app}>
      <Jokes />
    </div>
  );
}

export default Home;
