// React
import { Fragment } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
      <Typography variant="body1">{props.title}</Typography>
    </Button>
  );
};

SchoologyAssignment.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SchoologyAssignment;
