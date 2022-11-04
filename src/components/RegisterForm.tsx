import React, { useState } from "react";

import { useRegisterMutation } from "../store/api/authApiSlice";

import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUnlock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/styles/components/RegisterForm.module.scss";

interface ErrorType {
  data: {
    error: string | string[];
  };
  originalStatus: number;
}

export default function RegisterForm() {
  const [errMsg, setErrMsg] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [trigger] = useRegisterMutation();

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== cPassword) {
      setErrMsg("As senhas não coincidem");
      return;
    }

    try {
      await trigger({ email, password, user }).unwrap();
      navigate("/");
    } catch (err) {
      const error = err as ErrorType;
      if (error.originalStatus === 500) {
        setErrMsg("Erro no servidor");
      } else if (error.originalStatus === 400) {
        setErrMsg("Dados incompletos");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "cPassword") {
      setCPassword(e.target.value);
    } else {
      setUser(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.register_text}>
        <p>REGISTRE-SE</p>
      </div>
      {<p className={styles.err}>{errMsg}</p>}
      <form className={styles.form}>
        <div className={styles.form_input}>
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            placeholder="Usuário"
            id="user"
            value={user}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={`${styles.form_input} ${styles.input_first}`}>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.form_input}>
          <FontAwesomeIcon icon={faUnlock} />
          <input
            type="password"
            placeholder="Senha"
            id="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.form_input}>
          <FontAwesomeIcon icon={faUnlock} />
          <input
            type="password"
            placeholder="Repita a senha"
            id="cPassword"
            value={cPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <p className={styles.register}>
          Já possui uma conta?{" "}
          <span onClick={() => navigate("/")} role="button">
            Faça login!
          </span>
        </p>
        <button onClick={(e) => handleSubmitForm(e)}>REGISTRAR</button>
      </form>
    </div>
  );
}
