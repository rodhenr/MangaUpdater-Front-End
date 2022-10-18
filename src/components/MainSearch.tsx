import { useEffect } from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addSearchData } from "../store/slices/searchSlice";
import { checkName } from "../utils/nameCheck";
import styles from "../assets/styles/components/MainSearch.module.scss";
import {
  changeState,
  setMangaId,
  addModalData,
} from "../store/slices/modalSlice";
import Modal from "./Modal";
import { useSearchMangasQuery } from "../store/api/searchApiSlice";

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
  }, []);

  const openModal = (mangaId: string) => {
    dispatch(setMangaId(mangaId));
    dispatch(changeState(true));
  };

  return isSuccess && searchData.length > 0 ? (
    <div className={styles.container}>
      {modalOpen && <Modal />}
      {searchData.map((i) => (
        <div
          key={i.id}
          className={styles.chapter_container}
          onClick={() => openModal(i.id)}
        >
          <img src={i.image} alt={i.name} />
          <div className={styles.name}>
            <p>{checkName(i.name, 21)}</p>
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
