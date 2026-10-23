"use client";

import css from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
];

const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={css.headerWrapper}>
      <div className={css.header}>
        <Link href="/" aria-label="Home" className={css.logo}>
          <Image
            src="/images/logo-icon.svg"
            alt="TravelTrucks"
            width={136}
            height={16}
            priority
          />
        </Link>

        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={css.navigationLink}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
