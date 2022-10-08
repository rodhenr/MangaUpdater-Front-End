import axios from "axios";
import { useEffect, useState } from "react";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

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

export default function MainSearch() {
  const [data, setData] = useState<Data[]>([]);
  const [err, setErr] = useState("");
  const searchItem = useSelector((state: RootState) => state.search.item);
  const tokenTest =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjUyNjEzNDIsImV4cCI6MTY2NTI2NDk0Mn0.XiAdUX54I6LfjtAJataa_6EhO0OWXPCSg3QJH8QeeRI";

  useEffect(() => {
    const mangaData = async () => {
      const mangaData: Data[] = await axios({
        method: "GET",
        url: `http://localhost:8080/api/search?word=${searchItem}`,
        headers: {
          authorization: `Bearer ${tokenTest}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((i) => i.data)
        .catch((i) => setErr(i));

      setData(mangaData);
    };

    mangaData();
  }, [searchItem]);

  return data.length > 0 ? (
    <div>{data[0].author}</div>
  ) : (
    <div>Carregando...</div>
  );
}
