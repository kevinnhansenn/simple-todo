import styles from "./CardFooter.module.css";

export function CardFooter() {
  return (
    <div className={styles.container}>
      <div>&copy; Simple Todo List</div>
      <div>Kevin Hansen&#8482;</div>
    </div>
  );
}
