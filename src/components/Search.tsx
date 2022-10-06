import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../assets/styles/components/Search.module.scss";

export function Search() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <div className={styles.bar}>
        <input type="text" placeholder="Pesquise por um mangá" />
      </div>
    </div>
  );
}
