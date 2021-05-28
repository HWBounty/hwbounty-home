import {
  Button,
  Card,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { hwbountyAPI } from "../redux/types";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      cPasswordError: "",
      loading: false,
      emailVerif: false,
    };
  }
  componentDidMount() { }
  signup(self) {
    self.setState({ loading: true });
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    if (!firstName)
      self.setState({ firstNameError: "This field is required!" });
    if (!lastName) self.setState({ lastNameError: "This field is required!" });
    if (!username) self.setState({ usernameError: "This field is required!" });
    if (!email) self.setState({ emailError: "This field is required!" });
    if (!password)
      return self.setState({ passwordError: "This field is required!" });
    if (password !== cpassword)
      self.setState({
        passwordError: "Passwords do not match!",
        cPasswordError: "Passwords do not match!",
      });
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      self.setState({ emailError: "Invalid Email!" });
    if (username.length < 3)
      self.setState({
        usernameError: "Username must be 3 or more characters long!",
      });
    if (!username.match(/^[a-zA-Z0-9_]*$/))
      self.setState({ usernameError: "Username must be alphanumeric" });
    //Check if usernameTaken
    //-1 = Failed, 0 = pending, 1 = checks passed
    let processReady = 0;
    (async () => {
      let res = await axios.get(`${hwbountyAPI}/usernameTaken/${username}`);
      if (res.data) {
        self.setState({ usernameError: "This username already exists!" });
        processReady = -1;
      } else {
        processReady++;
      }
    })();
    (async () => {
      let res = await axios.get(`${hwbountyAPI}/emailTaken/${email}`);
      if (res.data) {
        self.setState({ emailError: "This is already in use!" });
        processReady = -1;
      } else {
        processReady++;
      }
    })();
    (async () => {
      while (processReady === 0 || processReady === 1) await sleep(10);
      if (processReady === -1) return self.setState({ loading: false });
      //Process signup;
      let signupRes = await axios.post(`${hwbountyAPI}/signup`, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      });
      if (signupRes.status === 200 && signupRes.data)
        self.setState({ emailVerif: true, loading: false });
    })();
  }
  onTextChange(self) {
    self.setState({
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      cPasswordError: "",
    });
  }
  render() {
    if (localStorage.getItem("DBIdToken")) this.props.history.push("/");
    return (
      <Container
        style={{
          paddingLeft: window.innerWidth <= 960 ? "0vw" : "20vw",
          paddingRight: window.innerWidth <= 960 ? "0vw" : "20vw",
        }}
      >
        <Snackbar open={this.state.emailVerif} autoHideDuration={10000}>
          <Alert severity="success">
            We have successfully recieved your signup! Please check your email
            for the next steps!
          </Alert>
        </Snackbar>
        <Card>
          <img
            src={
              this.props.UI.theme
                ? "https://cdn.discordapp.com/attachments/836672960566919228/836863806905778186/logo_min_white.png"
                : "https://cdn.discordapp.com/attachments/806706215693975552/832762321214111765/logo_min.png"
            }
            height="100"
          ></img>
          <Typography
            variant="h5"
            style={{
              fontSize: "3vw",
            }}
          >
            Registration Form
          </Typography>
          <form autoComplete="off">
            <div style={{ marginBottom: 10 }}>
              <TextField
                required
                error={this.state.firstNameError}
                id="firstName"
                label="First Name"
                variant="outlined"
                style={{
                  margin: 5,
                  width: 200,
                }}
                helperText={this.state.firstNameError}
                onChange={(x) => this.onTextChange(this)}
              />
              <TextField
                required
                id="lastName"
                error={this.state.lastNameError}
                label="Last Name"
                variant="outlined"
                style={{
                  margin: 5,
                  width: 200,
                }}
                helperText={this.state.lastNameError}
                onChange={(x) => this.onTextChange(this)}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <TextField
                required
                id="username"
                error={this.state.usernameError}
                label="Username"
                variant="outlined"
                style={{
                  margin: 5,
                  width: 410,
                }}
                helperText={this.state.usernameError}
                onChange={(x) => this.onTextChange(this)}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <TextField
                required
                id="email"
                error={this.state.emailError}
                label="Email"
                variant="outlined"
                style={{
                  margin: 5,
                  width: 410,
                }}
                helperText={this.state.emailError}
                onChange={(x) => this.onTextChange(this)}
              />
            </div>
            <div>
              <TextField
                required
                id="password"
                error={this.state.passwordError}
                label="Password"
                variant="outlined"
                type="password"
                style={{
                  margin: 5,
                  width: 200,
                }}
                helperText={this.state.passwordError}
                onChange={(x) => this.onTextChange(this)}
              />
              <TextField
                required
                id="cpassword"
                error={this.state.cPasswordError}
                label="Confirm Password"
                variant="outlined"
                type="password"
                style={{
                  margin: 5,
                  width: 200,
                }}
                helperText={this.state.cPasswordError}
                onChange={(x) => this.onTextChange(this)}
              />
            </div>
          </form>
          <Button
            disabled={this.state.loading}
            style={{
              margin: 40,
              fontSize: 16,
            }}
            variant="outlined"
            onClick={(x) => this.signup(this)}
          >
            {" "}
            {this.state.loading ? <CircularProgress size="28px" /> : "Sign Up"}
          </Button>
        </Card>
      </Container>
    );
  }
}
export default connect((state) => ({ UI: state.UI }))(withRouter(SignUpPage));
