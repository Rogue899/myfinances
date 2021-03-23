import React, { useEffect, useState } from "react";
import api from "../utils/api";
import TableComponent from "./shared/TableComponent";

function Home({ balanceList }) {
  const [companies, setCompanies] = useState([]);

  const columns = [
    { title: "Company" },
    { title: "Balance", css: { textAlign: "right" } },
  ];

  useEffect(() => {
    let isMounted = true;
    const getBalances = async () => {
      try {
        const { data: balance } = await api.balances.getAll();
        if (!isMounted) return;
        setCompanies(balance);
      } catch (e) {
        console.error(e);
      }
    };
    getBalances();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <TableComponent
        Thead={columns}
        Tbody={companies}
        path="company"
        variant="company"
      />
    </div>
  );
}

export default Home;
