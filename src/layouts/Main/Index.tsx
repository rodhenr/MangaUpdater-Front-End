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
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 8);

  const arrayTest: Data[] = [
    {
      image: "https://cdn.mangaupdates.com/image/i389561.jpg",
      name: "Overlord",
      author: "Autor",
      sources: {
        mangaId: "123456",
        chapter: "123",
        id: "1234",
        linkId: "abcd123",
        lastChapter: "123",
        scan: "teste",
        date: new Date(),
      },
    },
    {
      image: "https://cdn.mangaupdates.com/image/i389561.jpg",
      name: "Overlord",
      author: "Autor",
      sources: {
        mangaId: "123456",
        chapter: "123",
        id: "1234",
        linkId: "abcd123",
        lastChapter: "123",
        scan: "teste",
        date: new Date(),
      },
    },
    {
      image: "https://cdn.mangaupdates.com/image/i352053.jpg",
      name: "Overlord",
      author: "Autor",
      sources: {
        mangaId: "123456",
        chapter: "123",
        id: "1234",
        linkId: "abcd123",
        lastChapter: "123",
        scan: "teste",
        date: yesterday,
      },
    },
    {
      image: "https://cdn.mangaupdates.com/image/i352053.jpg",
      name: "Overlord",
      author: "Autor",
      sources: {
        mangaId: "123456",
        chapter: "123",
        id: "1234",
        linkId: "abcd123",
        lastChapter: "123",
        scan: "teste",
        date: yesterday,
      },
    },
    {
      image: "https://cdn.mangaupdates.com/image/i352053.jpg",
      name: "Overlord",
      author: "Autor",
      sources: {
        mangaId: "123456",
        chapter: "123",
        id: "1234",
        linkId: "abcd123",
        lastChapter: "123",
        scan: "teste",
        date: yesterday,
      },
    },
    {
      image: "https://cdn.mangaupdates.com/image/i352053.jpg",
      name: "Overlord",
      author: "Autor",
      sources: {
        mangaId: "123456",
        chapter: "123",
        id: "1234",
        linkId: "abcd123",
        lastChapter: "123",
        scan: "teste",
        date: lastWeek,
      },
    },
  ];

  const checkDate = (date: Date) => {
    const today = new Date();
    const tDate = `${today.getUTCDate()}/${
      today.getUTCMonth() + 1
    }/${today.getUTCFullYear()}`;

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = `${yesterday.getUTCDate()}/${
      yesterday.getUTCMonth() + 1
    }/${yesterday.getUTCFullYear()}`;

    const dDate = `${date.getUTCDate()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;

    if (dDate === tDate) {
      return "Hoje";
    } else if (dDate === yDate) {
      return "Ontem";
    } else {
      return dDate;
    }
  };

  return (
    <div className={styles.container}>
      {arrayTest.map((i, index) => {
        let last = "";
        const check = checkDate(i.sources.date);
        if (index > 0) last = checkDate(arrayTest[index - 1].sources.date);

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
  );
}
