import Link from "next/link";
import styles from "../styles/Home.module.css";
import SEO from "../components/seo";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <SEO />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Wallet{" "}
          <a target="_blank" rel="noreferrer" href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.4/contracts/finance/PaymentSplitter.sol">
            Splitter
          </a>
        </h1>

        <p className={styles.code}>An EVM agnostic wallet that splits crypto payments.</p>
        <img src="/logo.svg" alt="wallet splitter logo" width={256} height={256}></img>
        <p className={styles.code}>Solidity contracts written by OpenZepplin.</p>

        <div className={styles.grid}>
          <Link href="/create" passHref>
            <a className={styles.card}>
              <h2 className={styles.underline}>Create New &rarr;</h2>
              <p>Deploy a new contract and any EVM.</p>
            </a>
          </Link>

          <Link href="/split" passHref>
            <a className={styles.card}>
              <h2 className={styles.underline}>Split Existing &rarr;</h2>
              <p>Split payments among a group of accounts.</p>
            </a>
          </Link>

          <a target="_blank" rel="noreferrer" href="https://docs.walletsplitter.com" className={styles.card}>
            <h2 className={styles.underline}>Documentation &rarr;</h2>
            <p>Where all the technical jargon resides.</p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
