import css from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <Image
          src="/images/logo-icon.svg"
          alt="TravelTrucks"
          width={136}
          height={16}
          priority
        />
      </Link>
      <div className={css.navWrapper}>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/" className={css.navigationLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={css.navigationLink}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
