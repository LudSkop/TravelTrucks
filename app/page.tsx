import css from "./Home.module.css";

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.description}>
          You can find everything you want in our catalog
        </p>
        <button className={css.button}>View Now</button>
      </div>
    </main>
  );
}
