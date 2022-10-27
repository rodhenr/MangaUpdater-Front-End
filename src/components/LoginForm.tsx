import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addToken } from "../store/slices/authSlice";

import { useLoginMutation } from "../store/api/authApiSlice";

import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "../assets/styles/components/LoginForm.module.scss";

interface ErrorType {
  data: {
    error: string | string[];
  };
  originalStatus: number;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trigger] = useLoginMutation();

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const token = await trigger({ email, password }).unwrap();
      dispatch(addToken(token));
      navigate("/home");
    } catch (err) {
      const error = err as ErrorType;
      if (error.originalStatus === 500) {
        alert("Servidor com erro... Tente novamente.");
      } else if (error.originalStatus === 401) {
        alert("Usuário ou senha inválido!");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_text}>
        <p>ENTRAR</p>
      </div>
      <form className={styles.form}>
        <div className={`${styles.form_input} ${styles.input_first}`}>
          <FontAwesomeIcon icon={faUser} />
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
        <p className={styles.register}>
          Não possui uma conta?{" "}
          <span onClick={() => navigate("/register")} role="button">
            Cadastre-se já!
          </span>
        </p>
        <button onClick={(e) => handleSubmitForm(e)}>LOGIN</button>
      </form>
    </div>
  );
}
