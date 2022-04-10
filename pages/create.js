import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import Banner from "../components/banner";
import SEO from "../components/seo";
import CreateSplitterCard from "../components/createSplitterCard";
import UserInfoCard from "../components/userInfoCard";
import Footer from "../components/footer";

export default function Create() {
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    // if no metamask installed
    if (!window.ethereum) {
      return alert("please install wallet");
    }
    // get provider
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    // set provider
    setProvider(prov);
    // get accounts
    const accounts = await prov.listAccounts();
    // if not connected, connect to metamask
    if (accounts.length == 0) {
      await ethereum.request({ method: "eth_requestAccounts" });
    }
    // restart when account changes
    window.ethereum.on("accountsChanged", (account) => {
      setIsConnected(false);
    });
    // restart when network changes
    window.ethereum.on("chainChanged", (network) => {
      setIsConnected(false);
    });
    setIsConnected(true);
  };

  return (
    <>
      {isConnected ? <Banner /> : null}
      <div className={styles.container}>
        <SEO />
        <main className={styles.main}>
          {isConnected ? (
            <>
              <h1 className={styles.title}>Create New</h1>

              <div className={styles.grid}>
                <UserInfoCard provider={provider} />
                <CreateSplitterCard provider={provider} />
              </div>
            </>
          ) : (
            <>
              <img loader="https://bafkreifoaoz4vzansa2w353q3pcmgystq3kusgl7sa7j7s77ycyuazd5ey.ipfs.nftstorage.link/" src="/logo.svg" alt="wallet splitter logo" width={256} height={256}></img>
              <h2 className={styles.bigButton} onClick={handleConnect}>
                Connect Wallet &rarr;
              </h2>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
