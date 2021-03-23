import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router";
import FlagIcon from "@material-ui/icons/Flag";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import moment from "moment";

function TableComponent({ Thead, Tbody, path, variant }) {
  const history = useHistory();

  const currencyConverter = (balance, currency) => {
    switch (currency) {
      case "LBP":
        return balance * 1500;
      case "EUR":
        return balance * 1.84;
      default:
        return balance;
    }
  };

  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <StyledTableRow>
              {Thead.map((th) => (
                <StyledTableCell colSpan={1} style={th.css}>
                  {th.title}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(variant === "company" && (
              <>
                {Tbody.map((tb) => (
                  <StyledTableRow
                    onClick={() => history.push(`${path}/${tb.id}/`)}
                  >
                    <StyledTableCell component="th" scope="row">
                      {tb.companyName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {tb.payout
                        .filter((x) => !x.paid)
                        .map((x) => x.amount)
                        .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </>
            )) || (
              <>
                {Tbody.map((tb) => (
                  <>
                    <StyledTableRow
                      onClick={() => history.push(`balance/${tb.id}`)}
                      key={tb.id}
                    >
                      <StyledTableCell
                        variant="body"
                        colSpan={1}
                        component="th"
                        scope="row"
                        size="small"
                      >
                        <Typography className={classes.small}>
                          {tb.payoutName}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className={classes.small}>
                          {tb.description}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        {moment(tb.dateCreated).format("MMM Do")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {currencyConverter(parseInt(tb.amount), tb.currency)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {tb.currency}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {tb.paid ? <FlagIcon /> : <EmojiFlagsIcon />}
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                ))}
                <TableRow>
                  <TableCell>Total Balance</TableCell>
                  <TableCell>
                    {Tbody.filter((x) => !x.paid)
                      .map((x) => x.amount)
                      .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    cursor: "pointer",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  small: {
    [theme.breakpoints.down("xs")]: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "100px",
      overflow: "hidden",
      position: "relative",
    },
  },
}));

export default TableComponent;
