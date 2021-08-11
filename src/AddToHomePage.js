import { ButtonBase, Dialog, Divider, Grow, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux"
import TetLib from "./util/TetLib";
const useStyles = makeStyles(theme => ({
  mainCard: {
    "&::after":
    {
      filter: "blur(5px)"
    },
    width: "64.5vw",
    maxWidth: "384px",
    borderRadius: "0.75rem",
    position: "fixed",
    "-webkit-backdrop-filter": "blur(10px)",
    "-o-backdrop-filter": "blur(10px)",
    "-moz-backdrop-filter": "blur(10px)",
    "backdrop-filter": "blur(10px)",
    backgroundColor: theme => theme === 1 ? "rgba(38,38,38,0.98)" : "rgba(255,255,255,0.8)",
    zIndex: "5000",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
  acceptButton: {
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.3)",
      transition: "all 0.5s"
    }
  }
}));
export const AddToHomePage = (props) => {
  const {
    user,
    UI: { theme },
  } = props;
  const classes = useStyles(theme);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(async () => {
    await TetLib.sleep(500);
    setDialogOpen(true);
    localStorage.setItem("installDismissed", "yes lol");
  }, []);
  return (

    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}

    >
      <Grow
        in={dialogOpen}
        {...(dialogOpen ? { timeout: 800 } : {})}
        style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", transitionDelay: "300" }}
      >
        <div className={classes.mainCard}>
          <div style={{ margin: "5vw" }}>
            <Typography style={{ fontSize: "16px", fontFamily: "Roboto,sans-serif", fontWeight: "550", textAlign: "center", marginBottom: "0.25rem" }}>Install "HWBounty" as an app?</Typography>
            <Typography style={{ fontSize: "12px", fontFamily: "Roboto,sans-serif", textAlign: "center" }}>Did you know that "HWBounty can be installed as an application? Just tap the&nbsp;<img src="https://orbiit.github.io/gunn-web-app/images/ios7share.png" width="8px" />&nbsp; icon and select the <b>"Add to home screen"</b> option in the bottom row, then tap add!</Typography>
          </div>
          <Divider />
          <ButtonBase style={{ width: "100%", height: "32px", paddingTop: "1.25rem", paddingBottom: "1.25rem", borderRadius: "0 0 0.75rem 0.75rem" }} disableRipple className={`${classes.acceptButton}`} onClick={() => setDialogOpen(false)}><Typography style={{ fontSize: "16px", fontFamily: "Roboto,sans-serif", fontWeight: "500", textAlign: "center", color: "rgb(101,147,240)" }}>Gotcha!</Typography></ButtonBase>
          <br />
        </div>
      </Grow>
    </Dialog>

  )


}
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps)(AddToHomePage);