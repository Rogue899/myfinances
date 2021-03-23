import { createContext } from "react";

const BalanceContext = createContext({
  name: "",
  description: "",
  date: "",
  amount: "",
  id: "",
  paid: false,
});

export default BalanceContext;
