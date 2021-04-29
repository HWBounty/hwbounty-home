// React
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { setTheme, setAuthPopupOpen } from "../../redux/actions/uiActions";

// MUI Components & Styling
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import themeFile from "../../util/theme";

// MUI Icons
import DarkThemeIcon from "@material-ui/icons/Brightness4Rounded";
import LightThemeIcon from "@material-ui/icons/Brightness7Rounded";

import AccountIconButton from "../User/AccountIconButton";
import axios from "axios";
import PageSearch from "./PageSearch";

const styles = {
  ...themeFile.spreadIt,
  root: {
    height: 50,
  },
  iconButton: {
    marginLeft: "auto",
  },
};
let themeValue = 0;
let alreadySet = 0;
export const getTheme = ()=>{return themeValue};
export const Navbar = (props) => {
  const {
    classes,
    UI: { theme },
    user: { authenticated },
    setAuthPopupOpen,
  } = props;
  const [user, setUser] = useState(null)
  // const [themeValue, setThemeVal] = useState(theme);

  if (user) {
    if (!localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(user));
  } else {
    axios.get("https://api.hwbounty.help/@me").then((res) => {
      if (res.status === 200 && res.data && res.data.password) {
       setUser(res.data);
      }
    }).catch(console.trace);
  }
  const toggleTheme = () => {
    const newVal = themeValue === 1 ? 0 : themeValue + 1;
    localStorage.setItem("theme",newVal);
    themeValue = newVal;
    // setThemeVal(newVal);
    props.setTheme(newVal);
  };
  if (~~localStorage.getItem("theme") && !alreadySet){ toggleTheme();alreadySet++}
  const UserButton = () => {
    return (
      <div>
        {authenticated ? (
          <AccountIconButton />
        ) : (
          <Button onClick={() => setAuthPopupOpen(true)}>LOGIN</Button>
        )}
      </div>
    );
  };

  return (
    <div className={classes.root} style={{
      minHeight:75
    }}>
      <Toolbar style={{
        zIndex: 10000000,
      }}>
        <PageSearch/>
        <IconButton onClick={toggleTheme} className={classes.iconButton}>
          {themeValue === 0 ? <DarkThemeIcon /> : <LightThemeIcon />}
        </IconButton>
        <UserButton />
      </Toolbar>
    </div>
  );
};

Navbar.propTypes = {
  setTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { setTheme, setAuthPopupOpen })(
  withStyles(styles)(Navbar)
);
