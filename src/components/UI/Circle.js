import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as todoActions from "../../store/actions/todo";

const Circle = (props) => {
  const useStyles = makeStyles((theme) => ({
    circle: {
      marginTop: "3px",
      backgroundColor: props.color,
      width: 30,
      height: 30,
      borderRadius: "50%",
      transitionDuration: 300,
      transitionProperty: "transform",
      "&:hover": {
        transform: "scale(1.5,1.5)",
        transitionDuration: 300,
      },
    },
    highlight: {
      borderColor: "black",
      borderWidth: "2px",
      borderStyle: "solid",
      width: 30,
      height: 30,
      borderRadius: "50%",
    },
  }));

  const dispatch = useDispatch();

  const classes = useStyles();

  const selectColor = async (e) => {
    e.target.classList.add(classes.highlight);
    await dispatch(todoActions.selectColor(props.color));
  };

  return <div onClick={selectColor} className={classes.circle}></div>;
};

export default Circle;
