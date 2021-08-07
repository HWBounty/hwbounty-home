import { Typography } from "@material-ui/core";
import moment from "moment";
import { useState } from "react";

export const CTime = (props) => {
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
          fontFamily: "Poppins",
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
          fontSize: "1.65vw",
          fontFamily: "Poppins",
          fontWeight: "20",
        }}
      >
        {
            /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
          "dddd M/D/YYYY"
        )
        }
      </Typography>
    </div>
  );
};
export const CTime2 = (props) => {
  return (
    <div
    >
      <Typography
        variant="h5"
        style={{
          fontSize: "3rem",
          fontFamily: "Poppins",
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
          fontSize: "2rem",
          fontFamily: "Poppins",
          fontWeight: "20",
        }}
      >
        {
            /*moment().format(window.innerWidth <= 1368 ? "M/D/YYYY h:mm:ss A" : "dddd MMMM Do h:mm:ss A")*/ moment().format(
          "dddd M/D/YYYY"
        )
        }
      </Typography>
    </div>
  );
};
export default CTime;