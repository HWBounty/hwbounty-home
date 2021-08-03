import { Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import t from "../util/localization/localization";

console.log(t("thing"));
console.log(t("thingWithArgs", { arg: "test", arg2: "testing" }));
console.log(t("thingWithMoreThings.thing"));
console.log(t("thingWithMoreThings.thingWithArgs", { arg: "test" }));

export const LandingPage = (props) => {
  const history = useHistory();
  const goToPage = (path) => {
    history.push(path);
  };
  return (
    <Button onClick={() => goToPage("/dashboard")}>
      It looks like you are not signed in! We are currently building our landing
      page, but if you want to go to the dashboard, click me!
    </Button>
  );
};
export default connect()(LandingPage);
