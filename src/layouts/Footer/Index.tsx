import styles from "../../assets/styles/layouts/Footer.module.scss";

export function Index() {
  const date = new Date();
  return (
    <div className={styles.container}>
      <p>Rodrigo Henrique - {date.getFullYear()}</p>
    </div>
  );
}
