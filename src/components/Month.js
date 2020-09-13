import React, { useRef } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  Toolbar,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import * as calendarActions from "../store/actions/calendar";

const Month = (props) => {
  const storeColor = useSelector((state) => state.todo.color);
  const useStyles = makeStyles({
    paper: {
      maxWidth: 450,
      maxHeight: 470,
      marginTop: 30,
      boxShadow: "5px 5px 5px",
    },
    table: {
      maxWidth: 450,
      maxHeight: 470,
    },
    highLight: {
      backgroundColor: storeColor,
      opacity: "100%",
    },
    toolbar: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    day: {
      cursor: "pointer",
    },
    month: {
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
  });

  const classes = useStyles();

  let monthNumber;
  let emptySpace = [];
  let days = [];
  let tableCells = [];
  let tableRows = [];

  const dispatch = useDispatch();

  const elRefs = useRef([]);

  const storeTodo = useSelector((state) => state.todo.todoSelected);
  const storeCalendar = useSelector((state) => state.calendar.todoDays);

  const marcarTarea = (e, day, month, index) => {
    console.log(elRefs[day - 1]);
    dispatch(calendarActions.addDayTodo(day, month, storeColor, storeTodo));
    let verifyClass = e.target.classList.value.includes(classes.highLight);
    if (verifyClass) {
      e.target.classList.remove(classes.highLight);
    } else {
      e.target.classList.add(classes.highLight);
    }
  };

  const marcarTareaPorSet = (day) => {
    elRefs[day - 1].current.className = classes.highLight;
  };

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
    elRefs.current[i - 1] = React.createRef();
  }

  for (let day = 1; day < daysInMonth; day++) {
    days.push(
      <TableCell
        onClick={(e) => {
          marcarTarea(e, day, monthNumber);
        }}
        key={`${day}-${monthNumber}`}
        ref={elRefs[day - 1]}
      >
        {/* {storeCalendar.map((dayInCalendar) => {
          if (dayInCalendar.day === day) {
            if (dayInCalendar.month === monthNumber) {
              marcarTareaPorSet(day, monthNumber);
            }
          }
        })} */}
        {day}
      </TableCell>
    );
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
    return (
      <TableRow className={classes.day} key={uuidv4()}>
        {day}
      </TableRow>
    );
  });

  return (
    <Paper className={classes.paper} key={uuidv4()}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.month}>{props.month}</Typography>
      </Toolbar>
      <TableContainer className={classes.table}>
        <Table size="medium">
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
