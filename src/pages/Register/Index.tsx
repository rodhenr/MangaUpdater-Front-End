import RegisterForm from "../../components/RegisterForm";
import AuthHeader from "../../components/AuthHeader";

import styles from "../../assets/styles/pages/Register.module.scss";

export function Index() {
  return (
    <div className={styles.container}>
      <AuthHeader />
      <RegisterForm />
    </div>
  );
}
