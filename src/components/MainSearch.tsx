import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { addSearchData } from "../store/slices/searchSlice";
import {
  changeState,
  setMangaId,
  clearModalData,
} from "../store/slices/modalSlice";

import { useSearchMangasQuery } from "../store/api/searchApiSlice";

import { checkName } from "../utils/nameCheck";

import styles from "../assets/styles/components/MainSearch.module.scss";

export default function MainSearch() {
  const dispatch = useDispatch();
  const searchItem = useSelector((state: RootState) => state.search.item);
  const searchData = useSelector((state: RootState) => state.search.data);
  const modalOpen = useSelector((state: RootState) => state.modal.open);

  const { data, isSuccess, isError, isLoading } =
    useSearchMangasQuery(searchItem);

  useEffect(() => {
    if (data === undefined || data === null) {
      dispatch(addSearchData([]));
    } else {
      dispatch(addSearchData(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (!modalOpen) return;

    dispatch(changeState(false));
    dispatch(clearModalData());
    dispatch(setMangaId(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (mangaId: string) => {
    dispatch(setMangaId(mangaId));
    dispatch(changeState(true));
  };

  return isSuccess && searchData.length > 0 ? (
    <div className={styles.container}>
      {searchData.map((i) => (
        <div
          key={i.id}
          className={styles.chapter_container}
          onClick={() => openModal(i.id)}
        >
          <img src={i.image} alt={i.name} />
          <div className={styles.name}>
            <p>{checkName(i.name, 22)}</p>
          </div>
        </div>
      ))}
    </div>
  ) : isError ? (
    <div className={styles.err}>
      <p>Ocorreu um problema...</p>
    </div>
  ) : isLoading ? (
    <div className={styles.loading}>
      <p>Carregando...</p>
    </div>
  ) : (
    <div className={styles.noresult}>
      <p>Nenhum resultado encontrado para "{searchItem}"</p>
    </div>
  );
}
