import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImage from "../../assets/images/profile-image.jpg";
import { useNavigate } from "react-router";
import headerImage from "../../assets/images/header-image.jpg";
import styles from "../../assets/styles/layouts/Header.module.scss";

export function Index() {
  const navigate = useNavigate();

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
      <h1 onClick={() => navigate("/")}>MANGA UPDATER</h1>
    </div>
  );
}
