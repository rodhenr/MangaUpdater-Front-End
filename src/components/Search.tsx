import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { changeSearch } from "../store/slices/searchSlice";
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
    navigate("/search");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={() => handleSubmit()}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <div className={styles.bar}>
        <input
          type="text"
          placeholder="Pesquise por um mangá (minimo 3 caracteres)"
          value={item}
          onChange={(e) => handleInput(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </div>
  );
}
