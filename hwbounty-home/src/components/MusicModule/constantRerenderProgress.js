import { Box, LinearProgress, Typography } from "@material-ui/core";
import { useState } from "react";
let parseSecsToEnglish = (secs)=>{
	let mins = Math.floor(secs/60);
	let sec = Math.floor(secs-(mins*60))
	return `${mins}:${sec}`
}
let ProgressBarMusic = (props) => {
	
	const [currentTime, setcurrentTime] = useState(0);
	const [duration, setDuration] = useState(1);

	let [reRender, setRerender] = useState(false);
	const [rerenderInt, setrerenderInt] = useState(null);
	if (!rerenderInt)
		setrerenderInt(setInterval(() => {
			let player = document.getElementById("streamingVideoForMusic");
			setcurrentTime(player.currentTime);
			setDuration(player.duration);
			console.log(currentTime,duration,Math.round(currentTime * 100 / duration));
		}, 200));
		console.log(currentTime,duration);
	return (
			<Box display="flex" alignItems="left">
			  <Box width="100%" mr={1}>
				<LinearProgress variant="determinate" value={Math.round(currentTime * 100 / duration)} />
			  </Box>
			  <Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${parseSecsToEnglish(currentTime)} | ${parseSecsToEnglish(duration)}`}</Typography>
			  </Box>
			</Box>
		  );
}
export default ProgressBarMusic;