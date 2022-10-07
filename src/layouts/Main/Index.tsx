import axios from "axios";
import { useEffect, useState } from "react";
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
  const [data, setData] = useState<Data[]>([]);
  const tokenTest =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjUxNzgzMTMsImV4cCI6MTY2NTE4MTkxM30.IiIS4HF9RW27USqCMAP1JTs7ZpbsbhjU0XJz7tkeokk";

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
    const tDate = `${today.getDate}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = `${yesterday.getDate()}/${
      yesterday.getMonth() + 1
    }/${yesterday.getFullYear()}`;

    const dDate = `${date.getDate}/${date.getMonth}+ 1/${date.getFullYear}`;

    if (dDate === tDate) {
      return "Hoje";
    } else if (dDate === yDate) {
      return "Ontem";
    } else {
      return dDate;
    }
  };

  return data.length > 0 ? (
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
