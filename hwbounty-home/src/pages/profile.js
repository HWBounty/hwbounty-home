import {
  Avatar,
  Card,
  Chip,
  Fade,
  makeStyles,
  Modal,
  withStyles,
} from "@material-ui/core";
import { useState } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import Fuse from "fuse.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { hwbountyAPI } from "../redux/types";
import badges from "../util/badges";
import React from "react";
import moment from "moment";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
/*
TODO: remove mui theme provider here, it should work without it!!!
(maybe check pallete or something?, color is sent but dark mode is not)
*/
const styles = (theme) => ({
  ...theme.spreadIt,
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));
export const Profile = (props) => {
  const {
    UI: { theme },
  } = props;
  const [userData, setUserData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("");
  const [pfpChangeOpen, setpfpChangeOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const onClickPfp = () => {
    setpfpChangeOpen(true);
  };
  const closePfpChange = () => {
    setpfpChangeOpen(false);
  };
  const renderChips = (data) => {
    if (!data) return null;
    return (
      <div
        style={{
          width: "30vw",
          margin: "10px",
        }}
      >
        {React.Children.toArray(
          data.split(",").map((x) => {
            return (
              <Chip
                label={badges[x]?.name || "Unknown Badge!"}
                color="primary"
                onClick={() => enqueueSnackbar(`${badges[x].description}`)}
              />
            );
          })
        )}{" "}
      </div>
    );
  };
  if (error) {
    // history.push()
    return null;
  }
  if (!userData && !fetching) {
    setFetching(true);
    (async () => {
      let fetchres = await axios
        .get(
          `${hwbountyAPI}/user/${history.location.pathname.split("/").pop()}`
        )
        .catch((er) => {
          console.trace(er);
          setError(true);
        });
      if (fetchres && fetchres.status === 200) {
        setBio(fetchres.data.bio);
        setPfp(fetchres.data.pfp);
        setUserData(fetchres.data);

        setFetching(false);
      }
    })();
  }
  const handleEditBio = () => {
    if (
      userData &&
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user"))?.privateID === userData.privateID
    ) {
      setEditingBio(true);
    }
  };
  const postBio = async () => {
    let updateSelf = await axios.post(`${hwbountyAPI}/updateSelf`, {
      bio: bio,
    });
  };
  const stopEditingBio = () => {
    if (!bio) setBio(userData.bio);
    postBio();
    setEditingBio(false);
  };
  const updateBio = (event, nv) => {
    setBio(nv || event.target.value);
  };
  const updatePfp = (event, nv) => {
    const FR = new FileReader();
    FR.onloadend = async (e) => {
      setPfp(e.target.result || event.target.value);
      enqueueSnackbar(`Setting New Profile Picture...`);
      console.log(
        e.target.result.substring(0, 25),
        e.target.result.substring(e.target.result.indexOf(",") + 1)
      );
      await axios.post(`${hwbountyAPI}/changePfp`, {
        base64: e.target.result.substring(e.target.result.indexOf(",") + 1),
      });
      enqueueSnackbar(`Set new profile picture!`);
    };
    FR.readAsDataURL(document.getElementById("pfpFileInput").files[0]);
  };
  if (userData) {
    return (
      <Container>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={pfpChangeOpen}
          onClose={closePfpChange}
          closeAfterTransition
          // BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={pfpChangeOpen}>
            <Card
              style={{
                height: "500px",
                width: "70%",
                margin: "15",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <input type="file" onChange={updatePfp} id="pfpFileInput" />
              <Avatar
                src={
                  pfp ||
                  "https://cdn1.iconfinder.com/data/icons/materia-human/24/013_003_account_profile_circle-512.png"
                }
                className={classes.large}
                style={{
                  display: "inline-block",
                }}
              />
            </Card>
          </Fade>
        </Modal>
        <Card>
          <Typography
            variant="h5"
            style={{
              fontFamily: "Nunito",
              fontSize: "64px",
            }}
          >
            {userData.firstName} {userData.lastName}
          </Typography>
          <Avatar
            src={
              pfp ||
              "https://cdn1.iconfinder.com/data/icons/materia-human/24/013_003_account_profile_circle-512.png"
            }
            className={classes.large}
            style={{
              display: "inline-block",
            }}
            onClick={
              JSON.parse(localStorage.getItem("user"))?.privateID ===
                userData.privateID && onClickPfp
            }
          />
          <Typography
            variant="h5"
            style={{
              fontFamily: "Nunito",
            }}
          >
            @{userData.publicID}
          </Typography>
          <Paper
            style={{
              display: "inline-block",
              margin: "10",
              boxShadow: "none",
              background: theme ? "rgb(50,50,50)" : "rgb(230,230,230)",
            }}
          >
            {renderChips(userData.tags)}
          </Paper>
          <Container
            style={{
              display: "block",
            }}
          >
            <Paper
              style={{
                background: theme ? "rgb(70,70,70)" : "rgb(240,240,240)",
                margin: "10",
                boxShadow: "none",
                minHeight: "100px",
                maxWidth: "100%",
                minWidth: "100%",
                display: "inline-block",
              }}
            >
              <Typography variant="h5" onClick={handleEditBio}>
                {!editingBio ? bio : ""}
              </Typography>
              {editingBio ? (
                <TextField
                  id="bioTextField"
                  label=""
                  multiline
                  rowsMax={4}
                  value={bio}
                  onBlur={stopEditingBio}
                  onChange={updateBio}
                  style={{
                    width: "100%",
                  }}
                />
              ) : null}
            </Paper>
            <Typography variant="h1">Stats</Typography>
            <div
              style={{
                textAlign: "left",
                marginLeft: "5vw",
                marginRight: "5vw",
              }}
            >
              <Typography variant="h5">
                <b>User ID</b> {userData.privateID}
              </Typography>
              <Typography variant="h5">
                <b>Joined on</b>{" "}
                {moment(parseInt(userData.createdAt)).format(
                  "dddd MMMM Do h:mm:ss A"
                )}{" "}
                ( {moment(parseInt(userData.createdAt)).fromNow()} )
              </Typography>
              <Typography variant="h5">
                <b>Balance</b>{" "}
                {typeof userData.bal !== "undefined"
                  ? `${userData.bal} Coins`
                  : "Hidden"}
              </Typography>
            </div>
          </Container>
        </Card>
      </Container>
    );
  }
  return null;
};

export default connect((state) => ({ UI: state.UI }))(
  withStyles(styles)(Profile)
);
