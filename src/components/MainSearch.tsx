import axios from "axios";
import { useEffect } from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addErr, addSearchData } from "../store/slices/searchSlice";
import { checkName } from "../utils/nameCheck";
import styles from "../assets/styles/components/MainSearch.module.scss";
import { changeState, setMangaId } from "../store/slices/modalSlice";
import Modal from "./Modal";

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
  const modalOpen = useSelector((state: RootState) => state.modal.open);
  const err = useSelector((state: RootState) => state.search.err);

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

      if (mangaData.length === 0) {
        dispatch(addSearchData(mangaData));
        dispatch(addErr("Nenhum resultado encontrado"));
      } else {
        dispatch(addSearchData(mangaData));
        dispatch(addErr(""));
      }
    };

    mangaData();
  }, [searchItem]);

  const openModal = (mangaId: string) => {
    dispatch(setMangaId(mangaId));
    dispatch(changeState());
  };

  return data.length > 0 && err === "" ? (
    <div className={styles.container}>
      {modalOpen && <Modal />}
      {data.map((i) => (
        <div
          key={i.id}
          className={styles.chapter_container}
          onClick={() => openModal(i.id)}
        >
          <img src={i.image} alt={i.name} />
          <p>{checkName(i.name, 21)}</p>
        </div>
      ))}
    </div>
  ) : err !== "" ? (
    <div className={styles.err}>
      <p>{err}</p>
    </div>
  ) : (
    <div className={styles.loading}>
      <p>Carregando...</p>
    </div>
  );
}
