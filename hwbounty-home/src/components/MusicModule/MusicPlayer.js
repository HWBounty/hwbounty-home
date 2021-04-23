import { Container, Grid, IconButton, LinearProgress, Slider, Typography } from "@material-ui/core";
import { Image, Pause, PlayArrow, VolumeDown, VolumeUp } from "@material-ui/icons";
import { useState } from "react";
import ProgressBarMusic from "./constantRerenderProgress";
import Player from "./Player";
let getHighestThumbnail = (thumbnails) => {
	let best = null;
	thumbnails.forEach(x => {
		if (!best) best = x;
		if (x.height * x.width > best.height * best.width) best = x;
	});
	return best.url;
	// 	height: 110
	// url: "https://i.ytimg.com/vi/8pm_KoguqPM/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDev0be3mUX8bFZb-TmX4jAKy29Tg"
	// width: 196
}
let MusicPlayer = (props) => {
	//Required props:
	let player = document.getElementById("streamingVideoForMusic");
	const [playPaused, setplayPaused] = useState(false)
	const [volume, setVolume] = useState(50);
	if (!Player?.self?.currentSong) return null;
	let updatePPState = (async () => {
		player = document.getElementById("streamingVideoForMusic");
		if (player.currentTime === player.duration) {
			player.currentTime = 0;
		}
		else if (player.paused) await player.play();
		else {
			await player.pause();
		}

		setplayPaused(!playPaused);
	});
	let updateVolume = (event, newValue) => {
		player = document.getElementById("streamingVideoForMusic");
		player.volume = newValue/100;
		setVolume(newValue);
	}
	let getPlayer = () => { return player; }
	return (
		<Container style={{
			marginBottom: "3vh",
			marginTop: "3vh",
			textAlign: "center",
			alignItems: "center",
		}}>
			<div style={{
				alignContent: "center",
				display: "inline-block",
				background: `url(${Player.self.currentSong.bestThumbnail})center/cover`,
				minHeight: "200px",
				minWidth: "200px",
				// maxHeight: "10vw",
				// maxWidth: "10vw",
				borderRadius: "10px",
				marginBottom: "1vh"
			}}>
			</div>

			<Typography variant="subtitle1" style={{
				marginBottom: "1vh"
			}}>{Player.self.currentSong?.songName}</Typography>

			<ProgressBarMusic player={getPlayer} />
			<span>
				{player.paused ?
					(<IconButton onClick={(x) => updatePPState()}>
						<PlayArrow />
					</IconButton>) :
					(<IconButton onClick={(x) => updatePPState()}>
						<Pause />
					</IconButton>)
				}
				<Grid container spacing={2}>
					<Grid item>
						<VolumeDown />
					</Grid>
					<Grid item xs>
						<Slider value={volume} onChange={updateVolume} aria-labelledby="continuous-slider" />
					</Grid>
					<Grid item>
						<VolumeUp />
					</Grid>
				</Grid>

			</span>
		</Container>
	);
}
export default MusicPlayer;