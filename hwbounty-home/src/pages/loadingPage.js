import { connect } from "react-redux";

//Idk why i did this lmao
export const LoadingPage = (props) => {
  const theme = props?.UI?.theme || 1;
  return (<div style={{
    position: "absolute",
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: "10000000000000",
    background: theme ? "#393939" : "rgb(250,250,250)",
  }}>
    <video src={theme === 1? "https://github.com/HWBounty/HWBountyAssets/blob/main/frogdarkmode.mp4?raw=true" : "https://github.com/HWBounty/HWBountyAssets/blob/main/froglightmode.mp4?raw=true"} autoPlay control loop style={
      {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: "10000000000000",
        display: "block"
      }
    } />
  </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps)(LoadingPage);