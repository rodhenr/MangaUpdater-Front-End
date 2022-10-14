import { useEffect } from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/slices/homeDataSlice";
import { checkDate } from "../utils/dateCheck";
import Modal from "./Modal";
import { checkName } from "../utils/nameCheck";
import { addSearchData, changeSearch } from "../store/slices/searchSlice";
import { changeState, setMangaId } from "../store/slices/modalSlice";
import styles from "../assets/styles/components/Home.module.scss";
import { useGetMangasQuery } from "../store/api/homeDataApiSlice";

export default function Home() {
  const { data, isSuccess, isError, isLoading } = useGetMangasQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();
  const mangaData = useSelector((state: RootState) => state.homeData.data);
  const modalOpen = useSelector((state: RootState) => state.modal.open);

  useEffect(() => {
    if (data === undefined || data === null) {
      dispatch(addData([]));
    } else {
      dispatch(addData(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(addSearchData([]));
    dispatch(changeSearch(""));
  }, [dispatch]);

  const openModal = (mangaId: string) => {
    dispatch(setMangaId(mangaId));
    dispatch(changeState());
  };

  return isSuccess && (mangaData.length > 0 || modalOpen === true) ? (
    <div className={styles.container}>
      {modalOpen && <Modal />}
      {mangaData.map((i, index) => {
        let last = "";
        const check = checkDate(i.sources.date);
        if (index > 0) last = checkDate(mangaData[index - 1].sources.date);

        return (
          <div className={styles.container_chapter} key={index}>
            {(last !== "" || index === 0) && check !== last ? (
              <p className={styles.check}>{check}</p>
            ) : null}
            <div
              className={styles.chapter}
              onClick={() => openModal(i.sources.mangaId)}
            >
              <img src={i.image} alt="manga_image" />
              <p>{checkName(i.name, 30)}</p>
              <div className={styles.chapter_info}>
                <p>Capítulo: {i.sources.lastChapter}</p>
                <p>Scan: {checkName(i.sources.scan, 10)}</p>
              </div>
            </div>
          </div>
        );
      })}
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
      <p>Você não está seguindo nenhum mangá</p>
    </div>
  );
}
