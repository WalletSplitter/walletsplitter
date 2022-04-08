import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function UserInfoCard({ provider }) {
  const [userAddress, setUserAddress] = useState("");
  const [chainName, setChainName] = useState("");
  const [chainId, setChainId] = useState("");

  useEffect(() => {
    (async () => {
      const { name, chainId } = await provider.getNetwork();
      const accounts = await provider.listAccounts();
      setUserAddress(accounts[0]);
      setChainId(chainId);
      setChainName(name);
    })();
  });

  return (
    <div className={styles.card}>
      <h2>My Info</h2>
      <hr></hr>
      <p>Address: {userAddress}</p>
      <hr></hr>
      <p>Name: {chainName.toUpperCase()}</p>
      <hr></hr>
      <p>Chain ID: {chainId}</p>
    </div>
  );
}
