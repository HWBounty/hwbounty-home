import { Component } from "react";
import ss from 'socket.io-stream';
import { connect } from "react-redux";
import socketClient, { io } from 'socket.io-client';
import { appendBuffer, withWaveHeader } from "../../util/musicHelper1";
import { loadFile } from "../../util/musicUtils";
import { Socket } from "socket.io";
import { Container, Paper, Tab, Tabs } from "@material-ui/core";
import MusicPlayer from "./MusicPlayer";
import Player from "./Player";
import QueuePage from "./QueuePage";
const getHighestThumbnail = (thumbnails) => {
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
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
/**
 * 
 * @param {Object} info 
 * @returns {CleanedVideoData}
 */
const cleanAndParseInfo = (info) => {
	return {
		songName: info.title,
		songAuthor: info.ownerChannelName,
		bestThumbnail: getHighestThumbnail(info.thumbnails),
		url: info.video_url,
	}
}
class MusicModule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			audionState: {
				startedAt: null,
				loadingProcess: 0,
			},
			volumeLevel: 2000,
			progress: 0,
			playState: 0,
			loading: false,
			socket: null,
			duration: 0,
			currentSong: null,
			tab: 0,
			songInfoMap: new Map(),
			updateMe: false,
		}
	}
	componentDidMount(props) {
		let player = new Player(this);
		let link = prompt("gib u-tube url link to play or type none to cancel.");
		if (!link || link.toLowerCase() === "none") return;
		player.playSong(link);
		(async () => {
			while (!player?.currentSong?.bestThumbnail) await sleep(1);
			this.setState({});
		})();
		//Dont Render
		// if (!this.state.songInfoMap) this.state.songInfoMap = new Map();
		// let { socket, loading } = this.state;
		// window.URL = window.URL || window.webkitURL;
		// window.MediaSource = window.MediaSource || window.WebKitMediaSource;
		// if (!socket) {
		// 	socket = socketClient("https://api.hwbounty.help/");
		// 	this.setState(Object.assign(this.state, {
		// 		socket: socket,
		// 	}))
		// }
		// /** @type {SocketIO.Socket} */
		// socket = this.state.socket;

		// let video = document.getElementById("streamingVideoForMusic");
		// let mediaSource = new window.MediaSource();
		// video.src = window.URL.createObjectURL(mediaSource);
		// video.volume = .5;
		// (async () => {
		// 	console.log("loadingsource");
		// 	while (mediaSource.readyState !== 'open') {
		// 		await sleep(1);
		// 	}
		// 	console.log("source now open!");
		// 	let queue = [];
		// 	mediaSource.onsourceclose = ((ev) => {
		// 		console.log("source closed!");
		// 	})
		// 	mediaSource.onsourceended = (ev) => {
		// 		console.log("source ended!");
		// 	}
		// 	let chunkcount = 0;
		// 	video.pause();
		// 	let link = prompt("gib u-tube url link to play or type none to cancel.");
		// 	if (!link || link.toLowerCase() === "none") return;
		// 	socket.emit('track', link);
		// 	let sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="opus"');
		// 	sourceBuffer.mode = "sequence";
		// 	let end = false;
		// 	let wait = true;
		// 	sourceBuffer.onupdateend = () => { wait = false };
		// 	let inter = setInterval(() => {
		// 		if (wait) return;
		// 		if (queue.length && mediaSource.readyState === "open" && sourceBuffer) {
		// 			let res = queue.shift();
		// 			try {
		// 				sourceBuffer.appendBuffer(res);
		// 			} catch (error) {
		// 				queue.unshift(res);
		// 			}

		// 		}
		// 	}, 1);
		// 	socket.on("video-data-stream", (data) => {
		// 		let uIntArray = new Uint8Array(data);
		// 		if (chunkcount === 0) {
		// 			sourceBuffer.appendBuffer(uIntArray);
		// 			// sourceBuffer.appendBuffer(uIntArray.buffer);
		// 			chunkcount++;
		// 			console.log("firstChunk", mediaSource.readyState)
		// 			video.play();
		// 		}
		// 		else
		// 			queue.push(uIntArray);
		// 		// if (queue.length === 33) {

		// 		// }
		// 	})
		// 	socket.on("video-info", (data) => {
		// 		let cleanedInfo = cleanAndParseInfo(data.videoDetails);
		// 		this.setState(Object.assign(this.state, { currentSong: cleanedInfo }));
		// 		this.state.songInfoMap.set(link,cleanedInfo);
		// 		console.log(this.state.currentSong);
		// 	})
		// 	socket.on("video-data-done", () => {
		// 		console.log("data done stream!");
		// 	})
		// })();
	}
	handleTabChange(event, newValue, self) {
		self.setState(Object.assign(self.state, { tab: newValue }));
	};
	render() {

		return (
			<div>


				<video id="streamingVideoForMusic" style={{
					display: "none"
				}} />
				<Container style={{
					position: "fixed",
					bottom: 0,
					right: 0,
					width: "20%",
					minWidth: 350,
					height: 500,
					margin: "5%",
					marginBottom: "10%",
				}}>

					< Paper >
						<Tabs
							value={this.state.tab}
							indicatorColor="primary"
							textColor="primary"
							onChange={(event, newValue) => this.handleTabChange(event, newValue, this)}
							variant="fullWidth"
						>
							<Tab label="Player" />
							<Tab label="Queue" />
						</Tabs>
						<Container>
							{this.state.tab === 0 && <MusicPlayer player={document.getElementById("streamingVideoForMusic")} />}
							{this.state.tab === 1 && <QueuePage player={document.getElementById("streamingVideoForMusic")} />}
						</Container>
					</Paper >
				</Container>
			</div>

		)

	}
}
export default connect()(MusicModule);
/**
 * @typedef {Object} CleanedVideoData
 * @property {String} bestThumbnail
 * @property {String} songName
 * @property {String} songAuthor
 * @property {String} url
 */