import RegisterForm from "../../components/RegisterForm";
import styles from "../../assets/styles/pages/Register.module.scss";
import AuthHeader from "../../components/AuthHeader";

export function Index() {
  return (
    <div className={styles.container}>
      <AuthHeader />
      <RegisterForm />
    </div>
  );
}
