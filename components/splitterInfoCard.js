import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import abi from "../contract/abi.json";
import { ethers } from "ethers";

export default function SplitterInfoCard({ provider, contractAddress }) {
  const [payees, setPayees] = useState([]);
  const [shares, setShares] = useState([]);

  useEffect(() => {
    getPayeeShares();
  }, [contractAddress]);

  const getPayeeShares = async () => {
    let newPayees = [];
    const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    // get the address of payees till error
    try {
      let index = 0;
      // you cray if it's split 100 ways
      while (index < 99) {
        const payee = await contract["payee(uint256)"](ethers.BigNumber.from(index));
        newPayees.push(payee);
        index++;
      }
    } catch {}
    // set the payees
    setPayees(newPayees);
    // get the shares of payees
    let newShares = [];
    for (let i = 0; i < newPayees.length; i++) {
      const share = await contract["shares(address)"](newPayees[i]);
      newShares.push(share.toString());
    }
    setShares(newShares);
  };

  return (
    <div className={styles.card}>
      <h2>Splitter Info</h2>
      {payees.map((payee, index) => (
        <div key={index}>
          <hr />
          <h3>Payee {index}</h3>
          <p>{payee}</p>
          <p>Share: {shares[index]}%</p>
        </div>
      ))}
    </div>
  );
}
