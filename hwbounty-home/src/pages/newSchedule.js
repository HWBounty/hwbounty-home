import { useEffect, useState } from "react";

import { connect } from "react-redux";

import BetaSchedule from "../components/Calendar/BetaSchedule";
import TetLib from "../util/TetLib";
import useForceUpdate from "../util/useForceUpdate";
import t from "../util/localization/localization";

const Schedule = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    let run = true;
    window.addEventListener("resize", forceUpdate);
    return () => {
      window.removeEventListener("resize", forceUpdate);
    };
  }, []);
  const [schedule, setSchedule] = useState(null);
  useEffect(() => {
    (async () => {
      localStorage.removeItem("cachedSchedule");
      while (!localStorage.cachedSchedule) await TetLib.sleep(100);
      setSchedule(JSON.parse(localStorage.cachedSchedule));
    })();
  }, []);

  if (!schedule) return null;

  console.log("aaaa", window.innerWidth);
  if (window.innerWidth >= 1100) {
    return <BetaSchedule schedule={schedule} />;
  } else {
    return <div>{t("newSchedule.hi")}</div>;
  }
};
export default connect()(Schedule);
