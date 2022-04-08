import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Link href="/" passHref>
        <img src="/logo.svg" alt="wallet splitter logo" width={50} height={50}></img>
      </Link>
    </div>
  );
}
