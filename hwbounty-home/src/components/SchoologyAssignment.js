// React
import { Fragment } from "react";
import PropTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

export const SchoologyAssignment = (props) => {
  return (
    <Fragment>
      {console.log("Hello")}
      <h1>{props.title}</h1>
      <a href={props.link}>{props.link}</a>
      <h2>{props.due}</h2>
    </Fragment>
  );
};

SchoologyAssignment.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
};

export default SchoologyAssignment;
