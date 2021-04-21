import { Component } from "react";
import ss from 'socket.io-stream';
import { connect } from "react-redux";
import socketClient from 'socket.io-client';
import { appendBuffer, withWaveHeader } from "../util/musicHelper1";
import { loadFile } from "../util/musicUtils";
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
			player: null,
			duration: 0,
		}
	}
	componentDidMount(props) {
		const { player, loading } = this.state;

		if (!player && !loading) {
			this.setState(Object.assign(this.state, {
				loading: true,
			}));
			(async () => {

				console.log("Loading Player",this.state);
				let plr = await loadFile({ frequencyC: 0, sinewaveC: null }, null, this);
				console.log("Loaded Player",this.state);
				alert("Starting player!");
				plr.setVolume(this.state.volumeLevel);
				this.setState(Object.assign(this.state, {
					audionState: { startedAt: Date.now(), loadingProcess: this.state.audionState.loadingProcess },
					loading: false,
					playState: "stop",
					player: plr
				}));
			})();
		}


	}
	render() {
		return null;
	}
}
export default connect()(MusicModule);