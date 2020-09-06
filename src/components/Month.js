import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  Toolbar,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Month = (props) => {
  const classes = useStyles();
  let monthNumber;
  let emptySpace = [];
  let days = [];
  let tableCells = [];
  let tableRows = [];
  switch (props.month) {
    case "Enero":
      monthNumber = 1;
      break;
    case "Febrero":
      monthNumber = 2;
      break;
    case "Marzo":
      monthNumber = 3;
      break;
    case "Abril":
      monthNumber = 4;
      break;
    case "Mayo":
      monthNumber = 5;
      break;
    case "Junio":
      monthNumber = 6;
      break;
    case "Julio":
      monthNumber = 7;
      break;
    case "Agosto":
      monthNumber = 8;
      break;
    case "Septiembre":
      monthNumber = 9;
      break;
    case "Octubre":
      monthNumber = 10;
      break;
    case "Noviembre":
      monthNumber = 11;
      break;
    case "Diciembre":
      monthNumber = 12;
      break;
    default:
      break;
  }

  let startDay = moment([2020, monthNumber - 1]).day();
  // let endDay = moment(startDay).endOf("month").day();

  let daysInMonth = moment(
    `2020-${monthNumber.toString()}`,
    "YYYY-MM"
  ).daysInMonth();

  for (let i = 0; i < startDay; i++) {
    emptySpace.push(<TableCell key={uuidv4()}>{""}</TableCell>);
  }

  for (let i = 1; i < daysInMonth; i++) {
    days.push(<TableCell key={uuidv4()}>{i}</TableCell>);
  }

  let totalDays = [...emptySpace, ...days];

  totalDays.forEach((day, index) => {
    if (index % 7 !== 0) {
      tableCells.push(day);
    } else {
      tableRows.push(tableCells);
      tableCells = [];
      tableCells.push(day);
    }

    if (index === totalDays.length - 1) {
      tableRows.push(tableCells);
    }
  });

  let formatedDays = tableRows.map((day, index) => {
    return <TableRow key={uuidv4()}>{day}</TableRow>;
  });

  return (
    <Paper key={props.key}>
      <Toolbar>{props.month}</Toolbar>
      <TableContainer>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Dom</TableCell>
              <TableCell>Lun</TableCell>
              <TableCell>Mar</TableCell>
              <TableCell>Mie</TableCell>
              <TableCell>Jue</TableCell>
              <TableCell>Vie</TableCell>
              <TableCell>Sab</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{formatedDays}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Month;
