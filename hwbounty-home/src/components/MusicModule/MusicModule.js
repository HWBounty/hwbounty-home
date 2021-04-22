import { Component } from "react";
import ss from 'socket.io-stream';
import { connect } from "react-redux";
import socketClient, { io } from 'socket.io-client';
import { appendBuffer, withWaveHeader } from "../../util/musicHelper1";
import { loadFile } from "../../util/musicUtils";
import { Socket } from "socket.io";
import { Container, Paper, Tab, Tabs } from "@material-ui/core";
import MusicPlayer from "./MusicPlayer";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
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
		}
	}
	componentDidMount(props) {

		let { socket, loading } = this.state;
		window.URL = window.URL || window.webkitURL;
		window.MediaSource = window.MediaSource || window.WebKitMediaSource;
		if (!socket) {
			socket = socketClient("https://api.hwbounty.help/");
			this.setState(Object.assign(this.state, {
				socket: socket,
			}))
		}
		/** @type {SocketIO.Socket} */
		socket = this.state.socket;

		let video = document.getElementById("streamingVideoForMusic");
		let mediaSource = new window.MediaSource();
		video.src = window.URL.createObjectURL(mediaSource);
		(async () => {
			console.log("loadingsource");
			while (mediaSource.readyState !== 'open') {
				await sleep(1);
			}
			console.log("source now open!");
			let queue = [];
			mediaSource.onsourceclose = ((ev) => {
				console.log("source closed!");
			})
			mediaSource.onsourceended = (ev) => {
				console.log("source ended!");
			}
			let chunkcount = 0;
			video.pause();
			let link = prompt("gib u-tube url link to play or type none to cancel.");
			if (!link || link.toLowerCase() === "none") return;
			socket.emit('track', link);
			let sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="opus"');
			sourceBuffer.mode = "sequence";
			let end = false;
			let wait = true;
			sourceBuffer.onupdateend = () => { wait = false };
			let inter = setInterval(() => {
				if (wait) return;
				if (queue.length && mediaSource.readyState === "open") {
					sourceBuffer.appendBuffer(queue.shift());
				}
			}, 1);
			socket.on("video-data-stream", (data) => {
				let uIntArray = new Uint8Array(data);
				if (chunkcount === 0) {
					sourceBuffer.appendBuffer(uIntArray);
					// sourceBuffer.appendBuffer(uIntArray.buffer);
					chunkcount++;
					console.log("firstChunk", mediaSource.readyState)
					video.play();
				}
				else
					queue.push(uIntArray);
				// if (queue.length === 33) {

				// }
			})
			socket.on("video-info", (data) => {
				this.setState(Object.assign(this.state, { currentSong: data }));
				console.log(this.state.currentSong);
			})
			socket.on("video-data-done", () => {
				console.log("data done stream!");
			})
		})();
	}
	handleTabChange(event, newValue) {
		this.setState(Object.assign(this.state, { tab: newValue }));
	};
	render() {

		return (
			<Container style={{
				position: "fixed",
				bottom: 0,
				right: 0,
				width: "20%",
				height: "20%",
				margin: "5%",
				marginBottom:"10%",
			}}>
				<video id="streamingVideoForMusic" style={{
					display: "none"
				}} />
				< Paper >
					<Tabs
						value={this.state.tab}
						indicatorColor="primary"
						textColor="primary"
						onChange={this.handleTabChange}
						variant="fullWidth"
					>
						<Tab label="Player" />
						<Tab label="Queue" />
					</Tabs>
					<Container>
						{this.state.tab === 0 && <MusicPlayer self={this} player={document.getElementById("streamingVideoForMusic")} />}
						{/* {this.state.tab === 1 && <Assignments />} */}
					</Container>
				</Paper >
			</Container>


		)

	}
}
export default connect()(MusicModule);