import { connect } from "react-redux";

export const VanityInvite = (props)=>{

}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});
export default connect(mapStateToProps)(VanityInvite);