import LoginForm from "../../components/LoginForm";
import AuthHeader from "../../components/AuthHeader";

import styles from "../../assets/styles/pages/Login.module.scss";

export function Index() {
  return (
    <div className={styles.container}>
      <AuthHeader />
      <LoginForm />
    </div>
  );
}
