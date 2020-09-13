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
import { useDispatch } from "react-redux";

const Register = (props) => {
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

  const registerUser = async () => {
    try {
      await dispatch(loginActions.signUser(values));
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Registrase
      </Button>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrarse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para registrarse, por favor, complete el siguiente formulario
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
              registerUser();
              handleClickClose();
            }}
            color="primary"
          >
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;
