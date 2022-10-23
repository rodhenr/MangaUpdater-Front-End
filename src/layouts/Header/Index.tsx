import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImage from "../../assets/images/profile-image.jpg";
import { useNavigate } from "react-router";
import headerImage from "../../assets/images/header-image.jpg";
import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../store/slices/authSlice";
import styles from "../../assets/styles/layouts/Header.module.scss";

export function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };

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
          <p>{user.toUpperCase()}</p>
        </div>
        <div onClick={() => handleLogout()}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>
      <h1 onClick={() => navigate("/home")}>MANGA UPDATER</h1>
    </div>
  );
}
