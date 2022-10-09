import axios from "axios";
import { useEffect } from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addSearchData } from "../store/slices/searchSlice";
import { checkName } from "../utils/nameCheck";
import styles from "../assets/styles/components/MainSearch.module.scss";

interface Source {
  id: string;
  linkId: string;
  lastChapter: string;
  scan: string;
  date: Date;
}

interface Data {
  id: string;
  image: string;
  name: string;
  source: Source[];
}

export default function MainSearch() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const searchItem = useSelector((state: RootState) => state.search.item);
  const data = useSelector((state: RootState) => state.search.data);

  useEffect(() => {
    const mangaData = async () => {
      const mangaData: Data[] = await axios({
        method: "GET",
        url: `http://localhost:8080/api/search?word=${searchItem}`,
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }).then((i) => i.data);

      dispatch(addSearchData(mangaData));
    };

    mangaData();
  }, [searchItem]);

  return data.length > 0 ? (
    <div className={styles.container}>
      {data.map((i) => (
        <div key={i.id} className={styles.chapter_container}>
          <img src={i.image} alt={i.name} />
          <p>{checkName(i.name, 21)}</p>
        </div>
      ))}
    </div>
  ) : (
    <div>Carregando...</div>
  );
}
