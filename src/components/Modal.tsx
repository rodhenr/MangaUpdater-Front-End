import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addModalData,
  changeState,
  setMangaId,
} from "../store/slices/modalSlice";
import {
  useGetModalMangaQuery,
  useFollowNewMangaMutation,
  useChangeFollowMutation,
  useDeleteFollowMutation,
} from "../store/api/modalApiSlice";
import styles from "../assets/styles/components/Modal.module.scss";

export default function Modal() {
  const dispatch = useDispatch();
  const mangaId = useSelector((state: RootState) => state.modal.mangaId);
  const modalData = useSelector((state: RootState) => state.modal.data);
  const { data, isSuccess } = useGetModalMangaQuery(mangaId);
  const [triggerNewFollow] = useFollowNewMangaMutation();
  const [triggerChangeFollow] = useChangeFollowMutation();
  const [triggerDeleteFollow] = useDeleteFollowMutation();

  useEffect(() => {
    if (data === undefined || data === null) {
      dispatch(
        addModalData({
          id: "",
          image: "",
          name: "",
          author: "",
          genres: "",
          sources: [],
          follow: false,
        })
      );
    } else {
      dispatch(addModalData(data));
    }
  }, [dispatch, data]);

  const handleSourceFollow = async (
    pathID: string,
    sourceID: string,
    mangaID: string
  ) => {
    if (!modalData.follow) {
      triggerNewFollow({
        mangaID,
        sourceID,
      });
    } else {
      triggerChangeFollow({
        mangaID: modalData.id,
        sourceID,
        action: "delete",
        pathID,
      });
    }
  };

  const handleCloseModal = () => {
    dispatch(changeState(false));
    dispatch(
      addModalData({
        id: "",
        image: "",
        name: "",
        author: "",
        genres: "",
        sources: [],
        follow: false,
      })
    );
    dispatch(setMangaId(""));
  };

  const handleDeleteAllFollows = async () => {
    triggerDeleteFollow(mangaId);
  };

  return isSuccess ? (
    <div className={styles.container}>
      <div className={styles.container_intern}>
        <div className={styles.close} onClick={() => handleCloseModal()}>
          X
        </div>
        <img src={modalData.image} alt={modalData.name} />
        <h1>{modalData.name}</h1>
        <p className={styles.author}><span>Autor:</span> {modalData.author}</p>
        <p className={styles.genres}><span>Gêneros:</span> {modalData.genres}</p>
        <div className={styles.sources}>
          {modalData.sources.map((i, index) => (
            <div
              key={i.pathID}
              className={
                modalData.follow === true
                  ? `${styles.following} ${styles.source_item}`
                  : `${styles.nofollow} ${styles.source_item}`
              }
              onClick={() => handleSourceFollow(i.pathID, i.sourceID, "teste")} // arrumar aqui
            >
              <p className={styles.last_chapter}>Capítulo {i.chapter}</p>
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
    </div>
  ) : (
    <div className={styles.container}>
      <p className={styles.loading}>Carregando...</p>
    </div>
  );
}
