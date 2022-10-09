import axios from "axios";
import { useEffect } from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/slices/homeData";
import { checkDate } from "../utils/dateCheck";
import Modal from "./Modal";
import { checkName } from "../utils/nameCheck";
import { changeState, setMangaId } from "../store/slices/modalSlice";
import styles from "../assets/styles/components/Home.module.scss";

interface Data {
  image: string;
  name: string;
  author: string;
  sources: {
    mangaId: string;
    chapter: string;
    id: string;
    linkId: string;
    lastChapter: string;
    scan: string;
    date: Date;
  };
}

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const data = useSelector((state: RootState) => state.homeData.data);
  const modalOpen = useSelector((state: RootState) => state.modal.open);

  useEffect(() => {
    const getMangas = async () => {
      const mangaData: Data[] = await axios({
        method: "GET",
        url: "http://localhost:8080/api/manga",
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }).then((i) => i.data);

      dispatch(addData(mangaData));
    };

    getMangas();
  }, []);

  const openModal = (mangaId: string) => {
    dispatch(setMangaId(mangaId));
    dispatch(changeState());
  };

  return data.length > 0 ? (
    <div className={styles.container}>
      {modalOpen ? <Modal /> : ""}
      {data.map((i, index) => {
        let last = "";
        const check = checkDate(i.sources.date);
        if (index > 0) last = checkDate(data[index - 1].sources.date);

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
  ) : (
    <div>Carregando...</div>
  );
}
