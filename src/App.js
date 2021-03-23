import { Container, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router";
import "./App.css";
import Balance from "./components/Balance";
import Home from "./components/Home";
import Payouts from "./components/Payouts";
import BalanceContext from "./components/shared/BalanceContext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const APP_BAR_HEIGHT = 30;

function App() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="App">
      <BalanceContext.Provider value="test">
        <Container component="main" maxWidth="xs" className={classes.content}>
          <Tooltip title={"back"}>
            <span>
              <IconButton>
                <ArrowBackIcon onClick={() => history.goBack()} />
              </IconButton>
            </span>
          </Tooltip>
          <Switch>
            <Route path="/company/:companyId/balance/:id" component={Payouts} />
            <Route path="/company/:companyId/" component={Balance} />
            <Route path="/account" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </BalanceContext.Provider>
    </div>
  );
}

export default App;

const useStyles = makeStyles(() => ({
  content: {
    flexGrow: 1,
    marginTop: APP_BAR_HEIGHT,
    maxWidth: 1400,
  },
}));
