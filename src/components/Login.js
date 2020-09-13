import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import * as loginActions from "../store/actions/login";
import * as todoActions from "../store/actions/todo";
import * as calendarActions from "../store/actions/calendar";

import { useDispatch } from "react-redux";

const Login = (props) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const logUser = async () => {
    try {
      await dispatch(loginActions.loginUser(values));
      await dispatch(todoActions.fetchTodoList());
      await dispatch(calendarActions.setDaysTodo());
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Loguearse
      </Button>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Loguearse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para loguearse, por favor, complete el siguiente formulario
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleChange("email")}
          />
          <TextField
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
            onChange={handleChange("password")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              logUser();
              handleClickClose();
            }}
            color="primary"
          >
            Loguearse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
