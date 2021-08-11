import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { lazy } from "react";
import AddToHomePage from "./AddToHomePage";

// Pages
const ModulesPicker = lazy(() => import("./pages/modulesPicker"));
const Login = lazy(() => import("./components/User/Authentication/Login"));
const Modules = lazy(() => import("./pages/modules"));
const ModulePicker = lazy(() => import("./pages/modulesPicker"));
const newSignup = lazy(() => import("./pages/newSignup"));
const Profile = lazy(() => import("./pages/profile"));
const signupCallback = lazy(() => import("./pages/signupCallback"));
const Settings = lazy(() => import("./pages/settings"));
const home = lazy(() => import("./pages/home"));
const Schedule = lazy(() => import("./pages/schedule"));
const ScheduleCatalog = lazy(() => import("./pages/schedules"));
const viewSchedule = lazy(() => import("./pages/viewSchedule"));
const setSchedule = lazy(() => import("./pages/setSchedule"));
const schoologyOauthRedirect = lazy(() => import("./pages/schoologyOauthRedirect"));
const LandingPage = lazy(() => import("./pages/landingPage"));
const VanityInvite = lazy(() => import("./pages/VanityInvite"));
const PageNotFound = lazy(() => import("./pages/404"));
const newProfile = lazy(() => import("./pages/newProfile"));
const scheduleBuilder = lazy(() => import("./pages/scheduleBuilder"));
const LoadingPage = lazy(() => import("./pages/loadingPage"));
const SchoologyButton = lazy(() => import("./components/SchoologyButton"));
export const Routes = (props) => {
  const {
    user: { authenticated },
  } = props;
  return (<Switch>
    <Route path="/dashboard" component={home} />
    <Route
      exact
      path="/"
      component={authenticated || localStorage.anonStorage ? home : LandingPage}
    />
    <Route
      exact
      path="/schoologyCallback"
      component={schoologyOauthRedirect}
    />
    <Route path="/signupcallback" component={signupCallback} />
    <Route exact path="/signup" component={newSignup} />
    <Route path="/signup/*" component={VanityInvite} />
    <Route path="/schedules" component={ScheduleCatalog} />
    <Route exact path="/schedule" component={Schedule} />
    <Route path="/schedule/view" component={viewSchedule} />
    <Route path="/schedule/set" component={setSchedule} />
    <Route
      path="/schedule/create"
      component={scheduleBuilder}
    />
    <Route exact path="/modules" component={ModulesPicker} />
    <Route path="/modules/:module" component={Modules} />
    <Route path="/user/" component={newProfile} />
    <Route path="/usertest/:userID" component={Profile} />
    <Route path="/settings/" component={Settings} />
    <Route path="/loadingPage/" component={LoadingPage} />
    <Route
      exact
      path="/login/schoology"
      component={SchoologyButton}
    />
    <Route path="/betaThing/" component={AddToHomePage} />
    <Route exact path="/login/" component={Login} />
    <Route path="*" component={PageNotFound} />
  </Switch>)
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});
export default connect(mapStateToProps)(Routes);