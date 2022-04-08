import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import abi from "../contract/abi.json";
import bytecode from "../contract/bytecode.json";

export default function CreateSplitterCard({ provider }) {
  const [isDeployed, setIsDeployed] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [submitMsg, setSubmitMsg] = useState("");
  const [payees, setPayees] = useState([
    {
      address: "0xAlice00000000000000000000000000000000000",
      shares: 50,
    },
    {
      address: "0xBob0000000000000000000000000000000000000",
      shares: 50,
    },
  ]);

  useEffect(() => {
    (async () => {
      const accounts = await provider.listAccounts();
      setUserAddress(accounts[0]);
    })();
  });

  function deletePayee(index) {
    const updatedPayees = [...payees];
    updatedPayees.splice(index, 1);
    setPayees(updatedPayees);
  }

  function addPayee() {
    const updatedPayees = [...payees];
    updatedPayees.push({
      address: "0x0",
      shares: 0,
    });
    setPayees(updatedPayees);
  }

  function updatePayeeShares(e, index) {
    const updatedPayees = [...payees];
    updatedPayees[index].shares = e.target.value;
    setPayees(updatedPayees);
  }

  function updatePayeeAddress(e, index) {
    const updatedPayees = [...payees];
    updatedPayees[index].address = e.target.value;
    setPayees(updatedPayees);
  }

  function isValidContract() {
    // check if shares add up to 100
    const totalShares = payees.reduce((acc, cur) => Number(acc) + Number(cur.shares), 0);
    if (totalShares !== 100) {
      setSubmitMsg("Shares must add up to 100");
      return false;
    }
    // check if payees are valid
    for (let i = 0; i < payees.length; i++) {
      const isAddress = ethers.utils.isAddress(payees[i].address);
      if (!isAddress) {
        setSubmitMsg("Invalid Payee Address: " + payees[i].address);
        return false;
      }
    }
    return true;
  }

  async function submitContract() {
    setSubmitMsg("");
    if (!isValidContract()) return;
    try {
      const addresses = payees.map((payee) => payee.address);
      const shares = payees.map((payee) => payee.shares);
      const factory = new ethers.ContractFactory(abi, bytecode.object, provider.getSigner(userAddress));
      const contract = await factory.deploy(addresses, shares);
      setSubmitMsg("Save Spliiter Address: " + contract.address);
      window.localStorage.setItem("contractAddress", contract.address);
      setIsDeployed(true);
    } catch (error) {
      console.error(error);
      setSubmitMsg(error.message);
    }
  }

  return (
    <div className={styles.card}>
      <h2>Create Payment Splitter</h2>
      <table>
        <thead>
          <tr>
            <th className={styles.splitterAddrColumn}>Address</th>
            <th>Shares</th>
          </tr>
        </thead>
        <tbody>
          {payees.map((payee, index) => (
            <tr key={index}>
              <td>
                <input value={payee.address} onChange={(e) => updatePayeeAddress(e, index)} className={styles.splitterAddrInput}></input>
              </td>
              <td>
                <input type="number" value={payee.shares} onChange={(e) => updatePayeeShares(e, index)} className={styles.splitterAddrInput}></input>
              </td>
              <td onClick={() => deletePayee(index)} className={styles.plusMinusBtn}>
                ➖
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td onClick={() => addPayee()} className={styles.plusMinusBtn}>
              ➕
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className={styles.smallButton} onClick={() => submitContract()}>
        Submit
      </h3>
      <code>{submitMsg}</code>
      {isDeployed ? (
        <Link href="/split" passHref>
          <h3 className={styles.smallButton}>View Splitter</h3>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
