import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeState, setMangaId } from "../store/slices/modalSlice";
import { addModalData } from "../store/slices/modalSlice";
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
          sources: [],
          follow: false,
        })
      );
    } else {
      dispatch(addModalData(data));
    }
  }, [dispatch, data]);

  const handleSourceFollow = async (linkId: string, source: string) => {
    if (!modalData.follow) {
      triggerNewFollow({
        mangaId: modalData.id,
        sourceId: source,
      });
    } else {
      triggerChangeFollow({
        mangaId: modalData.id,
        sourceId: source,
        action: "delete",
        linkId,
      });
    }
  };

  const handleCloseModal = () => {
    dispatch(changeState());
    dispatch(
      addModalData({
        id: "",
        image: "",
        name: "",
        author: "",
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
      <div className={styles.close} onClick={() => handleCloseModal()}>
        X
      </div>
      <h1>{modalData.name}</h1>
      <img src={modalData.image} alt={modalData.name} />
      <p>Autor: {modalData.author}</p>
      <div className={styles.sources}>
        {modalData.sources.map((i) => (
          <div
            key={i.id}
            className={
              modalData.follow === true
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
