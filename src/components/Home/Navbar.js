// React
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

import { setTheme, setAuthPopupOpen } from "../../redux/actions/uiActions";
import { _maxThemeVal } from "../../redux/types";

// MUI Components & Styling
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import themeFile from "../../util/theme";

import AccountIconButton from "../User/AccountIconButton";

import axios from "axios";

// Translation
import t from "../../util/localization/localization";

const styles = {
  ...themeFile.spreadIt,
  root: {
    height: 50,
  },
  iconButton: {
    marginLeft: "auto",
  },
};

export const Navbar = (props) => {
  const {
    classes,
    UI: { theme },
    user: { authenticated },
    setAuthPopupOpen,
  } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      if (!localStorage.getItem("user"))
        localStorage.setItem("user", JSON.stringify(user));
    } else {
      axios
        .get("https://api.hwbounty.help/@me")
        .then((res) => {
          if (res.status === 200 && res.data && res.data.password) {
            setUser(res.data);
          }
        })
        .catch(console.trace);
    }
  });

  const toggleTheme = () => {
    const newVal = theme === _maxThemeVal ? 0 : theme + 1;
    localStorage.setItem("theme", newVal);
    props.setTheme(newVal);
  };

  const UserButton = () => {
    return (
      <div>
        {authenticated ? (
          <AccountIconButton />
        ) : (
          <Button onClick={() => setAuthPopupOpen(true)}>
            {t("navbar.login")}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      className={classes.root}
      style={{
        minHeight: 75,
        position: "absolute",
        top: "0%",
        left: "0%",
        width: "100%",
      }}
    >
      <Toolbar style={{}}>
        {/* <PageSearch/> */}
        {/* <IconButton onClick={toggleTheme} className={classes.iconButton}>
          {themeValue === 0 ? <DarkThemeIcon /> : <LightThemeIcon />}
        </IconButton> */}
        <UserButton />
      </Toolbar>
    </div>
  );
};

Navbar.propTypes = {
  setTheme: PropTypes.func.isRequired,
  setAuthPopupOpen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { setTheme, setAuthPopupOpen })(
  withStyles(styles)(Navbar)
);
