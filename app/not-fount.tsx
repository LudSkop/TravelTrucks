import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>Сторінку не знайдено.</p>
      <Link href="/">Повернутися на головну</Link>
    </main>
  );
}
