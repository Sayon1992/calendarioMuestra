import React, { useState, useMemo } from "react";
import {
  Paper,
  Grid,
  Grow,
  TextField,
  Tooltip,
  Fab,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import * as todoActions from "../store/actions/todo";
//import { v4 as uuidv4 } from "uuid";
import { FixedSizeList } from "react-window";
import Circle from "./UI/Circle";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    top: "auto",
    right: 100,
    bottom: 100,
    left: "auto",
    position: "fixed",
    height: 500,
    width: 300,
  },
  inputCategoria: {
    marginLeft: 10,
    marginTop: 10,
  },
  addItem: {
    marginTop: 20,
    marginRight: 10,
  },
  list: {
    maxHeight: 300,
  },
  containerList: {
    width: "100%",
    height: 320,
    maxWidth: 300,
  },
  containerColors: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
}));

const TodoList = (props) => {
  const colors = [
    "purple",
    "orange",
    "red",
    "black",
    "yellow",
    "pink",
    "blue",
    "grey",
    "lightblue",
    "brown",
    "turquoise",
    "navy",
  ];
  const dispatch = useDispatch();

  const classes = useStyles();

  const storeTodos = useSelector((state) => state.todo.todos);
  const storeColor = useSelector((state) => state.calendar.color);

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const deleteTodo = async (id) => {
    await dispatch(todoActions.deleteTodoList(id));
  };

  const selectTodo = async (todo, id) => {
    await dispatch(todoActions.selectTodo(todo, id));
  };

  const renderList = (props) => {
    const { index, style } = props;
    return (
      <ListItem
        button
        style={style}
        key={storeTodos[index].id}
        onClick={() => {
          selectTodo(storeTodos[index].todo, storeTodos[index].id);
        }}
      >
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              deleteTodo(storeTodos[index].id);
            }}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
        <ListItemText primary={storeTodos[index].todo} />
      </ListItem>
    );
  };

  const addTodo = async () => {
    await dispatch(todoActions.addTodoList(value));
    setValue("");
  };

  return (
    <Grow in={props.checked}>
      <Paper elevation={8} className={classes.root}>
        <Grid container>
          <Grid item xs={9} className={classes.inputCategoria}>
            <TextField
              label="Categoria"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2} className={classes.addItem}>
            <Tooltip title="Agregar" onClick={addTodo}>
              <Fab size="small" color="secondary">
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container className={classes.containerList}>
          <FixedSizeList
            height={300}
            width={300}
            itemSize={30}
            itemCount={storeTodos.length}
          >
            {/* eslint-disable-next-line*/}
            {useMemo(() => renderList, [storeTodos, storeColor])}
          </FixedSizeList>
        </Grid>
        <Grid container className={classes.containerColors}>
          {colors.map((color) => {
            return (
              <Grid key={color} item xs={3} className={classes.containerColors}>
                <Circle key={color} color={color} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Grow>
  );
};

export default TodoList;
