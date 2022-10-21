import LoginForm from "../../components/LoginForm";
import styles from "../../assets/styles/pages/Login.module.scss";
import AuthHeader from "../../components/AuthHeader";

export function Index() {
  return (
    <div className={styles.container}>
      <AuthHeader />
      <LoginForm />
    </div>
  );
}
