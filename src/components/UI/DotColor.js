import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dot: {
    height: "5px",
    width: "5px",
    backgroundColor: "#bbb",
    borderRadius: "50%",
    display: "inline-block",
  },
}));

const DotColor = (props) => {
  const classes = useStyles();
  return <div className={classes.dot}></div>;
};

export default DotColor;
