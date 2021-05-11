//Idk why i did this lmao
export const LoadingPage = (p)=>{return (          <div style={{
    position: "absolute",
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: "10000000000000",
    background : "rgb(222,221,222)"
  }}>
  <video src="https://github.com/HWBounty/HWBountyAssets/blob/main/frog2.mov?raw=true" autoPlay control loop style={
    {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: "10000000000000",
    }  
  }/>
  </div>);
}
export default LoadingPage;