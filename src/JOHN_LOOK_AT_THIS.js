// Import connect from redux
import { connect } from "react-redux";

// Import a function from actions files
import { getUserData } from "./redux/actions/userActions";
import { updateSchedule } from "./redux/actions/dataActions";

export const ReduxyStuff = (props) => {
  // Access like this
  console.log(props.UI);

  // or like this
  const { UI } = props;

  // shothand to get 'firstname' only
  const {
    user: { firstname },
  } = props;
  console.log(firstname);

  return <div> test</div>;
};

// Returns an object
// these will be binded to props (props.UI, props.user, etc)
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
  module: state.module,
});

// Regular js object
const mapActionsToProps = {
  getUserData,
  updateSchedule,
};

// Connect the state and the actions to the props of 'test'
export default connect(mapStateToProps, mapActionsToProps)(test);
/*
can also be written like this for inline
export default connect((state) => ({UI: state.UI}), {getUserData})(test)

or to not include state
export default connect(null, mapActionsToProps)(test)
 */
