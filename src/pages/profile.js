// React
import { useState, useEffect } from "react";

import { useParams } from "react-router";

// Material UI
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Util
import axios from "axios";
import { hwbountyAPI } from "../redux/types";

// Translation
import t from "../util/localization/localization";

const useStyles = makeStyles({
  root: {
    width: "80vw",
    marginLeft: "10vw",
  },
  childCard: {
    maxWidth: "90%",
    display: "flex",
  },
});

const Profile = (props) => {
  const classes = useStyles();
  const { userID } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${hwbountyAPI}/user/${userID}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.trace(err);
      });
  }, []);

  return loading ? (
    <button />
  ) : (
    <Card className={classes.root}>
      <Card className={classes.childCard}>
        <div>
          <Avatar src={userData.pfp} />
        </div>
      </Card>
      <Card className={classes.childCard}>{t("profile.hi")}</Card>
    </Card>
  );
};

export default Profile;
