import axios from "axios";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DataModal } from "../store/slices/modalSlice";
import { addData } from "../store/slices/modalSlice";
import styles from "../assets/styles/components/Modal.module.scss";

function Modal() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state: RootState) => state.modal.open);
  const token = useSelector((state: RootState) => state.token.token);
  const mangaId = useSelector((state: RootState) => state.modal.mangaId);
  const data = useSelector((state: RootState) => state.modal.data);

  useEffect(() => {
    const getMangas = async () => {
      const mangaData: DataModal = await axios({
        method: "GET",
        url: `http://localhost:8080/api/manga/modal?mangaId=${mangaId}`,
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }).then((i) => i.data.data);

      dispatch(addData(mangaData));
    };

    getMangas();
  }, []);

  return data.name !== "" ? (
    <div className={styles.container}>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} />
      <p>{data.author}</p>
      <div>
        <p></p>
      </div>
      <button>{data.follow === true ? "Unfollow" : "Follow"}</button>
    </div>
  ) : (
    <div>Carregando...</div>
  );
}

export default Modal;
