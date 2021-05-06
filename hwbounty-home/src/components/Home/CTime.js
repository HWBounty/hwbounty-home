import { Typography } from "@material-ui/core";
import moment from "moment";
import { useState } from "react";

export const CTime = (props) => {
    const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date()); // default value can be anything you want
    return (
      <div
        style={{
          verticalAlign: "middle",
          width: "100%",
          minWidth: "100%",
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontSize: "3.5vw",
            textAlign: "left",
          }}
        >
          {
            /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
            "h:mm:ss A"
          )
          }
        </Typography>
        <Typography
          variant="h5"
          style={{
            fontSize: "1.5vw",
            textAlign: "left",
          }}
        >
          {
            /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
            "M/D/YYYY dddd"
          )
          }
        </Typography>
      </div>
    );
  };
export default CTime;