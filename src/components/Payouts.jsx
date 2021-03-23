import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import api from "../utils/api";

function Payouts() {
  const { companyId, id } = useParams();
  const [payout, setPayout] = useState({});
  const [companyUpdated, setCompanyUpdated] = useState([]);
  const history = useHistory();

  const paymentMethod = [
    {
      value: "BankersCheck",
      text: "CHECK",
    },
    {
      value: "MesterCard",
      text: "CARD",
    },
    {
      value: "CashPayment",
      text: "CASH",
    },
  ];
  const currency = [
    {
      value: "USD",
      text: "USD",
    },
    {
      value: "EUR",
      text: "EUR",
    },
    {
      value: "LBP",
      text: "LBP",
    },
  ];
  useEffect(() => {
    let isMounted = true;
    const getBalance = async () => {
      try {
        const { data: balance } = await api.balances.getCompany(companyId);
        if (!isMounted) return;
        setCompanyUpdated(balance);
        balance.payout?.map((x) => {
          if (x.id === id) {
            return setPayout(x);
          }
        });
      } catch (e) {
        console.error(e);
      }
    };
    getBalance();
    return () => {
      isMounted = false;
    };
  }, [companyId, id]);

  const classes = useStyles();

  useEffect(() => {
    setCompanyUpdated((prev) => ({
      id: prev.id,
      companyName: prev.companyName,
      payout: prev.payout?.filter((x) => x.id !== id).concat(payout),
    }));
  }, [id, payout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.balances.updateBalance(companyId, companyUpdated);
    history.goBack();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          key={payout.id}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            disabled
            margin="normal"
            fullWidth
            id="payoutName"
            label="Payout Name"
            name="payout"
            defaultValue={payout.payoutName}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="payoutDescription"
            multiline
            autoFocus
            value={payout.description}
            onChange={(e) => {
              let val = e.target.value;
              setPayout((prev) => ({
                ...prev,
                description: val,
              }));
            }}
          />
          <div className={classes.amountWrapper}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="payoutAmount"
              label="Amount"
              name="amount"
              defaultValue={payout.amount}
              className={classes.amount}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={payout.paid}
                  color="primary"
                  onChange={(e) => {
                    let val = e.target.value;
                    console.log(val);
                    setPayout((prev) => ({
                      ...prev,
                      paid: !prev.paid,
                    }));
                  }}
                />
              }
              label="Paid"
            />
          </div>
          {payout.paid && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FormControl variant="outlined" className={classes.formMethod}>
                <InputLabel id="payoutMethod">Method</InputLabel>
                <Select
                  labelId="payoutMethod"
                  id="method"
                  value={payout.method}
                  onChange={(e) => {
                    let val = e.target.value;
                    setPayout((prev) => ({
                      ...prev,
                      paymentMethod: val,
                    }));
                  }}
                  label="Method"
                >
                  {paymentMethod.map((pm) => (
                    <MenuItem style={{ textAlign: "center" }} value={pm.value}>
                      {pm.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="payoutCurrency">CUR</InputLabel>
                <Select
                  labelId="payoutCurrency"
                  id="currency"
                  value={payout.currency}
                  onChange={(e) => {
                    let val = e.target.value;
                    setPayout((prev) => ({
                      ...prev,
                      currency: val,
                    }));
                  }}
                  label="Currency"
                >
                  {currency.map((c) => (
                    <MenuItem value={c.value}>{c.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  amountWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    width: "50%",
  },
  formControl: {
    margin: theme.spacing(2, 0),
    minWidth: 120,
    // width: theme.spacing(24.5),
  },
  formMethod: {
    margin: theme.spacing(2, 0),
    minWidth: 120,
    width: theme.spacing(25),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Payouts;
