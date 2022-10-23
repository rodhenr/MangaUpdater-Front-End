import { useEffect } from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/slices/homeDataSlice";
import { checkDate } from "../utils/dateCheck";
import { checkName } from "../utils/nameCheck";
import { addSearchData, changeSearch } from "../store/slices/searchSlice";
import {
  changeState,
  setMangaId,
  clearModalData,
} from "../store/slices/modalSlice";
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
  }, [data]);

  useEffect(() => {
    dispatch(addSearchData([]));
    dispatch(changeSearch(""));
    if (!modalOpen) return;

    dispatch(changeState(false));
    dispatch(clearModalData());
    dispatch(setMangaId(""));
  }, []);

  const openModal = (mangaId: string) => {
    dispatch(setMangaId(mangaId));
    dispatch(changeState(true));
  };

  return isSuccess && (mangaData.length > 0 || modalOpen === true) ? (
    <div className={styles.container}>
      {mangaData.map((i, index) => {
        let last = "";
        const check = checkDate(i.sources[0].date);
        if (index > 0) last = checkDate(mangaData[index - 1].sources[0].date);

        return (
          <>
            {(last !== "" || index === 0) && check !== last ? (
              <p className={styles.check}>{check}</p>
            ) : null}
            <div className={styles.container_chapter} key={index}>
              <div
                className={styles.chapter}
                onClick={() => openModal(i.mangaID)}
              >
                <img src={i.image} alt="manga_image" />
                <p>{checkName(i.name, 45)}</p>
                <div className={styles.chapter_info}>
                  <p>Capítulo: {i.sources[0].chapter}</p>
                  <p className={styles.scan}>Scan: {checkName(i.sources[0].scanlator, 15)}</p>
                </div>
              </div>
            </div>
          </>
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
