import React, { useState } from "react";
import { useLoginMutation } from "../store/api/authApiSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToken } from "../store/slices/authSlice";
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
  const [trigger, { error }] = useLoginMutation();

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const token = await trigger({ email, password }).unwrap();
      dispatch(addToken(token.accessToken));
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
        <p>Faça o login e descubra novos mangás!</p>
      </div>
      <form className={styles.form}>
        <div className={styles.form_input}>
          <label htmlFor="email">E-MAIL: </label>
          <input
            type="email"
            placeholder="Digite seu email"
            id="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.form_input}>
          <label htmlFor="password">SENHA: </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            id="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button onClick={(e) => handleSubmitForm(e)}>LOGIN</button>
      </form>
    </div>
  );
}
