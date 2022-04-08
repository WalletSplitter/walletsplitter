import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import abi from "../contract/abi.json";

export default function ReleaseNativeTokenCard({ provider, nativeTokenShares, contractAddress }) {
  const [tokenShares] = useState(nativeTokenShares);
  const [tokenMsg, setTokenMsg] = useState("");

  const releaseNativeTokens = async () => {
    setTokenMsg("");
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
      const userAddress = (await provider.listAccounts())[0];
      const response = await contract["release(address)"](userAddress);
      setTokenMsg(response.hash);
    } catch (error) {
      console.error(error);
      setTokenMsg(error.message);
    }
  };

  return (
    <div className={styles.card}>
      <h2>Native Tokens</h2>
      <p>Amount To Claim: {ethers.utils.formatEther(tokenShares)}</p>
      <h3 className={styles.smallButton} onClick={() => releaseNativeTokens()}>
        Claim
      </h3>
      <code>{tokenMsg}</code>
    </div>
  );
}
