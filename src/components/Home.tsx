import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { addData } from "../store/slices/homeDataSlice";
import { addSearchData, changeSearch } from "../store/slices/searchSlice";
import {
  changeState,
  setMangaId,
  clearModalData,
} from "../store/slices/modalSlice";

import { useGetMangasQuery } from "../store/api/homeDataApiSlice";

import { checkName } from "../utils/nameCheck";
import { orderArray } from "../utils/orderArray";

import styles from "../assets/styles/components/Home.module.scss";
import { useGetAvatarQuery } from "../store/api/userApiSlice";
import { changeUserAvatar } from "../store/slices/authSlice";

interface Sources {
  sourceID: string;
  pathID: string;
  chapter: string;
  date: Date;
  scanlator: string;
}

export interface Data {
  image: string;
  name: string;
  mangaID: string;
  sources: Sources[];
  date: string;
}

interface IMangaState {
  data: Data[];
  date: string;
}

export default function Home() {
  const [mData, setMData] = useState<IMangaState[] | []>([]);
  const { data, isSuccess, isError, isLoading } = useGetMangasQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: DataAvatar } = useGetAvatarQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();
  const mangaData = useSelector((state: RootState) => state.homeData.data);
  const modalOpen = useSelector((state: RootState) => state.modal.open);

  useEffect(() => {
    if (data === undefined || data === null) {
      dispatch(addData([]));
      setMData([]);
    } else {
      dispatch(addData(data));
      const arr = orderArray(data);
      setMData(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (DataAvatar === undefined || DataAvatar === null) {
    } else {
      dispatch(changeUserAvatar(DataAvatar));
    }
  }, [DataAvatar]);

  useEffect(() => {
    dispatch(addSearchData([]));
    dispatch(changeSearch(""));
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

  return isSuccess &&
    (mangaData.length > 0 || modalOpen === true) &&
    mData.length > 0 ? (
    <div className={styles.container}>
      {mData.map((i) => {
        return (
          <div className={styles.container_manga} key={i.data[0].mangaID}>
            <p className={styles.check}>{i.date}</p>
            <div className={styles.manga_list}>
              {i.data.map((j) => {
                return (
                  <div className={styles.container_chapter} key={j.mangaID}>
                    <div
                      className={styles.chapter}
                      onClick={() => openModal(j.mangaID)}
                    >
                      <img src={j.image} alt="manga_image" />
                      <p className={styles.mangaName}>
                        {checkName(j.name, 45)}
                      </p>
                      <div className={styles.chapter_info}>
                        <p>Cap??tulo: {j.sources[0].chapter}</p>
                        <p className={styles.scan}>
                          Scan: {checkName(j.sources[0].scanlator, 15)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
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
      <p>Voc?? n??o est?? seguindo nenhum mang??</p>
    </div>
  );
}
