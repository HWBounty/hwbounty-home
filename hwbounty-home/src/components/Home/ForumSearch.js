// React
import React, { useState } from "react";

// MUI
import { MuiThemeProvider } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

// MUI Treasury
import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";

import theme from "../../util/theme";

/*
TODO: remove mui theme provider here, it should work without it!!!
(maybe check pallete or something?, color is sent but dark mode is not)
*/

export const ForumSearch = (props) => {
  const [query, setQuery] = useState("");
  const roundInput = useRoundInputBaseStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "https://forums.hwbounty.help/?" + query;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <InputBase
          classes={roundInput}
          placeholder="Search on HWBounty Forums..."
          onChange={handleChange}
          value={query}
          {...props}
        />
      </form>
    </MuiThemeProvider>
  );
};

export default ForumSearch;
