import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { removeToken } from "../../store/slices/authSlice";

import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import profileImage from "../../assets/images/profile-image.jpg";

import styles from "../../assets/styles/layouts/Header.module.scss";

export function Index() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };

  const handleOpenModal = () => {
    setOpen(!open);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    //if (file.size >= 1024 || (file.type !== "image/png" && file.type !== "image/jpeg")) return;
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    //envia imagem para o backend
  };

  return (
    <div className={styles.container}>
      {open && (
        <div>
          <form className={styles.image_modal}>
            <div className={styles.modal_title}>
              <p>Faça upload de um novo avatar</p>
            </div>

            <div className={styles.modal_input}>
              <input type="file" onChange={(e) => handleFileChange(e)} />
            </div>
            <div className={styles.modal_button}>
              <button onClick={() => handleSubmit()}>ENVIAR</button>
            </div>
          </form>
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.info_user}>
          <img
            className={styles.user_image}
            src={profileImage}
            alt="user-avatar"
            onClick={() => handleOpenModal()}
          />
          <p>{user.toUpperCase()}</p>
        </div>
        <div onClick={() => handleLogout()}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>
      <div className={styles.site_title}>
        <h1 onClick={() => navigate("/home")}>MANGA UPDATER</h1>
      </div>
    </div>
  );
}
