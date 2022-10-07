import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImage from "../../assets/images/profile-image.jpg";
import styles from "../../assets/styles/layouts/Header.module.scss";
import headerImage from "../../assets/images/header-image.jpg";

export function Index() {
  return (
    <div className={styles.container}>
      <img className={styles.header_image} src={headerImage} alt="header" />
      <div className={styles.info}>
        <div className={styles.info_user}>
          <img
            className={styles.user_image}
            src={profileImage}
            alt="user-avatar"
          />
          <p>USER</p>
        </div>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
      <h1>MANGA UPDATER</h1>
    </div>
  );
}