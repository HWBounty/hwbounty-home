import { Container, LinearProgress, Typography } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import { useState } from "react";
import ProgressBarMusic from "./constantRerenderProgress";

let MusicPlayer = (props) => {
	//Required props:
	let { self, player } = props;

	if (!self?.state?.currentSong?.videoDetails) return null;

	let getPlayer = ()=>{ return player;}
	return (
		<Container style={{
			marginBottom: "10%",
			textAlign: "center",
			alignItems: "center",
		}}>
			<div style={
				{
					width: "10vw",
					height: "10vw",
					overflow: "hidden",
					margin: "2.5vw",
					// alignItems: "center",
					// position: "relative",
					background: `url(${self?.state?.currentSong?.videoDetails?.thumbnails?.pop()?.url})center/cover`
				}}>
			</div>
			<Typography variant="subtitle1">{self?.state?.currentSong?.videoDetails?.title}</Typography>
			
			<ProgressBarMusic player={getPlayer} />
		</Container>
	);
}
export default MusicPlayer;