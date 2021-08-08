import { useState } from "react";

import moment from "moment";

import { Typography } from "@material-ui/core";

export const CTimeSmall = (props) => {
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
          fontSize: "10vw",
          fontFamily: "Oswald",
        }}
        // align="left"
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
          fontSize: "5.65vw",
          fontFamily: "Nunito",
        }}
        // align="left"
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
export default CTimeSmall;
