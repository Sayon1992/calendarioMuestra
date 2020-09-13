import React from "react";
import { Tooltip, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

const TodoTooltip = (props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      onClick={() => {
        props.setChecked((prev) => !prev);
      }}
    >
      <Tooltip title="Listado">
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default TodoTooltip;
