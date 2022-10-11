import axios from "axios";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeState, DataModal } from "../store/slices/modalSlice";
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
      console.log(mangaId);
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

  const handleSourceFollow = async (linkId: string, source: string) => {
    if (!data.follow) {
      await axios({
        method: "POST",
        url: "http://localhost:8080/api/follow",
        data: { mangaId: data.id, sourceId: source },
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } else {
      await axios({
        method: "PATCH",
        url: "http://localhost:8080/api/follow",
        data: {
          mangaId: data.id,
          sourceId: source,
          action: "delete",
          linkId,
        },
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  };

  const handleDeleteAllFollows = async () => {};

  return data.name !== "" ? (
    <div className={styles.container}>
      <div className={styles.close} onClick={() => dispatch(changeState())}>
        X
      </div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} />
      <p>Autor: {data.author}</p>
      <div className={styles.sources}>
        {data.sources.map((i) => (
          <div
            key={i.id}
            className={
              data.follow === true
                ? `${styles.following} ${styles.source_item}`
                : `${styles.nofollow} ${styles.source_item}`
            }
            onClick={() => handleSourceFollow(i.linkId, i.id)}
          >
            <p className={styles.last_chapter}>Último: Ch {i.lastChapter}</p>
            <p className={styles.source}>MangaUpdates</p>
          </div>
        ))}
      </div>
      {data.follow === true && (
        <button
          onClick={() => handleDeleteAllFollows()}
          className={`${styles.followingB} ${styles.button}`}
        >
          Parar de Seguir Todos
        </button>
      )}
    </div>
  ) : (
    <div className={styles.container}>
      <p className={styles.loading}>Carregando...</p>
    </div>
  );
}

export default Modal;
