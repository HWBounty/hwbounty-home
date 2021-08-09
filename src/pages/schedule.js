import { useEffect, useState } from "react";

import { connect } from "react-redux";

import DesktopSchedulePage from "../components/Calendar/DesktopSchedule";
import MobileSchedulePage from "../components/Calendar/MobileSchedule";
import TetLib from "../util/TetLib";
import useForceUpdate from "../util/useForceUpdate";
import t from "../util/localization/localization";
import { updateSchedule } from "../redux/actions/dataActions";
import store from "../redux/store";
const Schedule = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    let run = true;
    window.addEventListener("resize", forceUpdate);
    return () => {
      window.removeEventListener("resize", forceUpdate);
    };
  }, []);
  const [schedule, setSchedule] = useState(JSON.parse(localStorage.cachedSchedule || "null"));
  useEffect(() => {
    (async () => {
      localStorage.removeItem("cachedSchedule");
      store.dispatch(updateSchedule());
      while (!localStorage.cachedSchedule) await TetLib.sleep(100);
      setSchedule(JSON.parse(localStorage.cachedSchedule));
    })();
  }, []);

  if (!schedule) return null;

  if (window.innerWidth >= 1100) {
    return <DesktopSchedulePage schedule={schedule} />;
  } else {
    return <MobileSchedulePage schedule={schedule} />;
  }
};
const mapActionsToProps = {
  updateSchedule
};
export default connect()(Schedule);
