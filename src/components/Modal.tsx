import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  addModalData,
  changeState,
  clearModalData,
  setMangaId,
} from "../store/slices/modalSlice";

import { useGetModalMangaQuery } from "../store/api/modalApiSlice";
import {
  useFollowNewMangaMutation,
  useChangeFollowMutation,
  useDeleteFollowMutation,
} from "../store/api/followApiSlice";

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
      dispatch(clearModalData());
    } else {
      dispatch(addModalData(data));
    }
  }, [dispatch, data]);

  const handleSourceFollow = async (
    pathID: string,
    sourceID: string,
    mangaID: string,
    follow: boolean
  ) => {
    const isFollow = modalData.sources.some((i) => i.follow === true);
    if (!isFollow) {
      triggerNewFollow({
        mangaID,
        sourceID,
      });
    } else if (follow) {
      triggerChangeFollow({
        mangaID: modalData.id,
        sourceID,
        action: "delete",
        pathID,
      });
    } else {
      triggerChangeFollow({
        mangaID: modalData.id,
        sourceID,
        action: "add",
        pathID,
      });
    }
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    const targetClass = (e.target as Element).className;

    if (
      targetClass.includes("Modal_container") ||
      targetClass.includes("Modal_close")
    ) {
      dispatch(changeState(false));
      dispatch(clearModalData());
      dispatch(setMangaId(""));
    }
  };

  const handleDeleteAllFollows = async () => {
    triggerDeleteFollow(mangaId);
  };

  return isSuccess ? (
    <div className={styles.container} onClick={(e) => handleCloseModal(e)}>
      <div className={styles.container_intern}>
        <div className={styles.close} onClick={(e) => handleCloseModal(e)}>
          X
        </div>
        <img src={modalData.image} alt={modalData.name} />
        <h1>{modalData.name}</h1>
        <div className={styles.alternative}>
          <span className={styles.alternative_title}>Outros nomes: </span>
          {modalData.alternativeNames.map((i, index) => {
            if (modalData.alternativeNames.length === index + 1) {
              return <span key={i}>{i}</span>;
            } else {
              return <span key={i}>{i}, </span>;
            }
          })}
        </div>
        <div className={styles.author}>
          <span>Autor: </span> <span>{modalData.author}</span>
        </div>
        <div className={styles.genres}>
          <span>Gêneros: </span>
          {modalData.genres.map((j, index) => {
            if (index + 1 !== modalData.genres.length) {
              return <span key={j}>{j}, </span>;
            } else {
              return <span key={j}>{j}</span>;
            }
          })}
        </div>
        <div className={styles.sources}>
          {modalData.sources.map((i) => (
            <div
              key={i.pathID}
              className={
                i.follow === true
                  ? `${styles.following} ${styles.source_item}`
                  : `${styles.nofollow} ${styles.source_item}`
              }
              onClick={() =>
                handleSourceFollow(i.pathID, i.sourceID, mangaId, i.follow)
              }
            >
              <p className={styles.last_chapter}>Capítulo {i.chapter}</p>
              <p className={styles.source}>{i.sourceName}</p>
            </div>
          ))}
        </div>
        {modalData.sources.some((i) => i.follow === true) === true && (
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
