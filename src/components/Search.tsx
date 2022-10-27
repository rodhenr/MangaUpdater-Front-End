import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { changeSearch } from "../store/slices/searchSlice";
import {
  changeState,
  clearModalData,
  setMangaId,
} from "../store/slices/modalSlice";

import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/styles/components/Search.module.scss";

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
    dispatch(clearModalData());
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
