import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Month from "./components/Month";
import TodoList from "./components/TodoList";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoTooltip from "./components/UI/TodoTooltip";

import { Grid, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logs: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
  },
}));

function App() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div>
      <CssBaseline />
      <Grid className={classes.logs} container>
        <Grid item>
          <Register />
        </Grid>
        <Grid item>
          <Login />
        </Grid>
      </Grid>
      <Grid className={classes.container} container>
        {months.map((month) => {
          return (
            <Grid
              key={uuidv4()}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className={classes.item}
            >
              <Month month={month} key={uuidv4()} />
            </Grid>
          );
        })}
        {checked ? <TodoList checked={checked} /> : null}
      </Grid>
      <TodoTooltip setChecked={setChecked} />
    </div>
  );
}

export default App;
