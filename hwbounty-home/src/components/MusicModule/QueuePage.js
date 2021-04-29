import { Card, Container, List, ListItem, Typography } from "@material-ui/core"
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd"
import Player from "./Player";
let parseSecsToEnglish = (secs) => {
	let mins = Math.floor(secs / 60);
	let sec = Math.round(secs - (mins * 60));
	mins = Math.round(secs / 60);
	mins = `${mins}`.length == 1 ? `0${mins}` : mins;
	sec = `${sec}`.length == 1 ? `0${sec}` : sec;
	return `${mins}:${sec}`
}
const QueuePage = (props) => {
	
	return (
		<List style={{
			minWidth: 300,
			height: 440,
			overflowX: "hidden",
			overflowY: "scroll",
			scrollbarWidth: "none",
		}}>
			{
				React.Children.toArray(Player.self.songQueue.map((songURL, i) => {
					let data = Player.self.songInfoMap.get(songURL) || null;
					return (
						<ListItem>
							<div style={{
								background: `url(${data?.bestThumbnail?.url || ""})center/cover`,
								minHeight: "64px",
								minWidth: "64px",
								maxHeight: "128px",
								maxWidth: "128px",
								borderRadius: "2px",
							}} />
							<Typography variant="caption" style={{
								marginLeft: "1vw"
							}}>{i+1}) {(data?.songName || songURL)}</Typography>
						</ListItem>
					);
				}))
			}
		</List>
	)
}
export default QueuePage;