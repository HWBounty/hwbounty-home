// React
import React from "react";

// Styling
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

// Translation Strings
import t from "../util/localization/localization";

const useStyles = makeStyles({
  oopsText: {
    fontFamily: "Oswald",
    fontSize: "12vw",
  },

  oopsDesc: {
    fontFamily: "Oswald",
    fontSize: "4vw",
  },
  overrideEverything: {
    zIndex: 1000000000000,
    position: "absolute",
    top: 0,
    left: 0,
    background: "#69b4acff",
    width: "100%",
    height: "100%",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  errorCode: {
    fontFamily: "Nunito",
    fontSize: "2.5vw",
  },
  returnButton: {
    fontFamily: "Poppins",
    fontSize: "2vw",
    textTransform: "none",
    color: "#205c55",
    fontWeight: "10",
  },
  memeText: {
    fontFamily: "Nunito",
    fontSize: "150%",
    color: "#8ce0d7",
    position: "absolute",
  },
  memeText1: {
    top: "3%",
    left: "3%",
  },
  memeText2: {
    top: "90%",
    left: "20%",
  },
  memeImage: {
    transform: "rotate(-12deg)",
    position: "absolute",
    top: "0%",
    left: "0%",
    zIndex: "-1",
  },
});
export const PageNotFound = (props) => {
  const classNames = useStyles();
  const history = useHistory();
  const returnHome = () => {
    history.push("/");
  };
  return (
    <div className={classNames.overrideEverything}>
      <Typography className={`${classNames.memeText} ${classNames.memeText1}`}>
        {t("404Page.hopper")}
      </Typography>
      <Typography className={`${classNames.memeText} ${classNames.memeText2}`}>
        {t("404Page.youCanStay")}
      </Typography>
      <div className={classNames.centerDiv}>
        <Typography className={classNames.oopsText}>
          {t("404Page.oops")}
        </Typography>
        <Typography className={classNames.oopsDesc}>
          {t("404Page.pageDoesNotExist")}
        </Typography>
        <Typography className={classNames.errorCode}>
          {t("errorCode.display", { code: "404", reason: "Page Not Found" })}
        </Typography>
        <Button
          variant="contained"
          className={classNames.returnButton}
          onClick={returnHome}
        >
          {t("404Page.back")}
        </Button>
        <img
          src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png"
          className={classNames.memeImage}
          height="20%"
        />
      </div>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <p>
    //       <h1> 404 Page not found </h1>
    //     </p>
    //     <a className="App-link" href="/">
    //       <Button variant="outlined">Return to home</Button>
    //     </a>
    //   </header>
    // </div>
  );
};

export default PageNotFound;
