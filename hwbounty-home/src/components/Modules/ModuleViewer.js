// React
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

// Modules
import Calculator from "./Calculator/Calculator";
import EssayEditor from "./EssayEditor/EssayEditor";
import { useLocation } from "react-router-dom";
import GasLaws from "./GasLaws";
import { Container } from "@material-ui/core";

const styles = {
  root: {
    height: "100%",
    flex: 1,
  },
};

export const ModuleViewer = (props) => {
  const {
    classes,
    // UI: { module },
  } = props;
  let loc = useLocation();
  let modName = loc.pathname.split("/").pop().toLowerCase();
  const Module = (props) => {
    switch (modName) {
      case "calculator":
        return <Calculator />;
      case "essay":
        return <EssayEditor />;
      case "gaslawscalc":
        return <GasLaws />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Module />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(ModuleViewer));
