import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../utils/api";
import TableComponent from "./shared/TableComponent";

function Balance() {
  const { companyId } = useParams();

  const [balances, setBalances] = useState([]);

  const columns = [
    { title: "Name" },
    { title: "Description" },
    { title: "Date" },
    { title: "Balance", css: { textAlign: "right" } },
    { title: "Currency", css: { textAlign: "right" } },
    { title: "Paid", css: { textAlign: "right" } },
  ];

  useEffect(() => {
    let isMounted = true;
    const getBalances = async () => {
      try {
        const { data: balance } = await api.balances.getCompany(companyId);
        if (!isMounted) return;
        setBalances(balance.payout);
      } catch (e) {
        console.error(e);
      }
    };
    getBalances();
    return () => {
      isMounted = false;
    };
  }, [companyId]);

  return (
    <div>
      <TableComponent Thead={columns} Tbody={balances} path="balance" />
    </div>
  );
}

export default Balance;
