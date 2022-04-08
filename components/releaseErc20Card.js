import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import abi from "../contract/abi.json";

export default function ReleaseErc20Card({ provider, erc20Name, erc20Shares, erc20Address, contractAddress }) {
  const [tokenName] = useState(erc20Name);
  const [tokenShares] = useState(erc20Shares);
  const [tokenAddress] = useState(erc20Address);
  const [tokenMsg, setTokenMsg] = useState("");

  const releaseErc20Tokens = async () => {
    setTokenMsg("");
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
      const userAddress = (await provider.listAccounts())[0];
      const response = await contract["release(address,address)"](tokenAddress, userAddress);
      setTokenMsg(response.hash);
    } catch (error) {
      console.error(error);
      setTokenMsg(error.message);
    }
  };

  return (
    <div className={styles.card}>
      <h2>Claim ERC-20</h2>
      <p>Token Name: {tokenName}</p>
      <p>Amount To Claim: {ethers.utils.formatEther(tokenShares)}</p>
      <h3 className={styles.smallButton} onClick={() => releaseErc20Tokens()}>
        Claim
      </h3>
      <code>{tokenMsg}</code>
    </div>
  );
}
