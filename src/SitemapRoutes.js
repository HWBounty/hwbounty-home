import { Switch, Route } from 'react-router';
export const SitemapRoutes = (<Switch>
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
  <Route exact path="/login/" component={Login} />
  <Route path="*" component={PageNotFound} />
</Switch>);
export default SitemapRoutes;