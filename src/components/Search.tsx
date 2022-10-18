import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { changeSearch } from "../store/slices/searchSlice";
import styles from "../assets/styles/components/Search.module.scss";
import {
  addModalData,
  changeState,
  setMangaId,
} from "../store/slices/modalSlice";

export function Search() {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handleSubmit = () => {
    if (item.length < 3) return;
    dispatch(changeSearch(item));
    setItem("");
    dispatch(changeState(false));
    dispatch(
      addModalData({
        id: "",
        image: "",
        name: "",
        author: "",
        genres: "",
        sources: [],
        follow: false,
      })
    );
    dispatch(setMangaId(""));
    navigate("/search");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <input
          type="text"
          placeholder="Pesquisar"
          value={item}
          onChange={(e) => handleInput(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      <div className={styles.icon} onClick={() => handleSubmit()}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
}
