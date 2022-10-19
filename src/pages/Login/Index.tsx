import LoginForm from "../../components/LoginForm";
import styles from "../../assets/styles/pages/Login.module.scss";

export function Index() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
