import axios from "axios";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import MainSearch from "../../components/MainSearch";
import styles from "../../assets/styles/layouts/Main.module.scss";

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

export function Index() {
  const searchItem = useSelector((state: RootState) => state.search.item);
  const [data, setData] = useState<Data[]>([]);
  const tokenTest =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjUyNjEzNDIsImV4cCI6MTY2NTI2NDk0Mn0.XiAdUX54I6LfjtAJataa_6EhO0OWXPCSg3QJH8QeeRI";

  useEffect(() => {
    const getMangas = async () => {
      const mangaData: Data[] = await axios({
        method: "GET",
        url: "http://localhost:8080/api/manga",
        headers: {
          authorization: `Bearer ${tokenTest}`,
          "Access-Control-Allow-Origin": "*",
        },
      }).then((i) => i.data);

      setData(mangaData);
    };

    getMangas();
  }, [tokenTest]);

  const checkDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const to2Digits = (num: number) => {
      return num.toString().padStart(2, "0");
    };

    const formatDate = (d: Date) => {
      return [
        to2Digits(d.getDate()),
        to2Digits(d.getMonth() + 1),
        d.getFullYear(),
      ].join("/");
    };

    const tDate = formatDate(today);
    const yDate = formatDate(yesterday);
    const dDate = formatDate(new Date(date));

    if (dDate === tDate) {
      return "Hoje";
    } else if (dDate === yDate) {
      return "Ontem";
    } else {
      return dDate;
    }
  };

  return searchItem !== "" ? (
    <div>
      <MainSearch />
    </div>
  ) : data.length > 0 ? (
    <div className={styles.container}>
      {data.map((i, index) => {
        let last = "";
        const check = checkDate(i.sources.date);
        if (index > 0) last = checkDate(data[index - 1].sources.date);

        return (
          <div className={styles.container_chapter} key={index}>
            {(last !== "" || index === 0) && check !== last ? (
              <p className={styles.check}>{check}</p>
            ) : null}
            <div className={styles.chapter}>
              <img src={i.image} alt="manga_image" />
              <p>{i.name}</p>
              <div className={styles.chapter_info}>
                <p>Capítulo: {i.sources.lastChapter}</p>
                <p>Scan: {i.sources.scan}</p>
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
