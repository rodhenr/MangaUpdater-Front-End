import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { removeToken } from "../../store/slices/authSlice";

import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import profileImage from "../../assets/images/profile-image.jpg";

import styles from "../../assets/styles/layouts/Header.module.scss";
import { useUploadAvatarMutation } from "../../store/api/userApiSlice";

export function Index() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadAvatar] = useUploadAvatarMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const userAvatar = useSelector((state: RootState) => state.auth.userAvatar);

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };

  const handleOpenModal = () => {
    setErrMsg("");
    setMsg("");
    setOpen(!open);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    setErrMsg("");
    setMsg("");
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!selectedFile) return;

    try {
      const form = new FormData();
      form.append("file", selectedFile);
      const upload = await uploadAvatar(form).unwrap();
      setMsg(upload);
    } catch (err) {
      setErrMsg("Houve um problema no seu upload...");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.info_user}>
          <img
            className={styles.user_image}
            src={userAvatar !== "" ? userAvatar : profileImage}
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
      {open && (
        <div>
          <form className={styles.image_modal}>
            <div
              role={"button"}
              className={styles.modal_close}
              onClick={() => handleOpenModal()}
            >
              X
            </div>
            <div className={styles.modal_title}>
              <p>Fa??a upload de um novo avatar</p>
            </div>

            <div className={styles.modal_input}>
              <input
                type="file"
                name="file"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className={styles.upload_msg_container}>
              {msg !== "" ? (
                <p className={styles.upload_msg}>{msg}</p>
              ) : errMsg !== "" ? (
                <p className={styles.upload_errMsg}>{errMsg}</p>
              ) : (
                <p></p>
              )}
            </div>
            <div className={styles.modal_button}>
              <button
                disabled={msg !== "" ? true : errMsg !== "" ? true : false}
                onClick={(e) => handleSubmit(e)}
              >
                ENVIAR
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
