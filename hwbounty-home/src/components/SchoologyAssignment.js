// React
import { Fragment } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

export const SchoologyAssignment = (props) => {
  const openLinkInNewTab = () => {
    const newWindow = window.open(props.url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <Button onClick={openLinkInNewTab}>
      <h1>{props.title}</h1>
      <h2>{props.due}</h2>
    </Button>
  );
};

SchoologyAssignment.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
};

export default SchoologyAssignment;
