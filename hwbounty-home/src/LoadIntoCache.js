import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
class LoadIntoCache extends Component {
	constructor(props) {
		super(props);
	}
	async updateUser(tries, delay) {
		await sleep(delay || 0);
		let data = await axios.get("https://api.hwbounty.help/@me").catch(() => { });
		if (data && data.status === 200 && data.data) {
			localStorage.setItem("user", JSON.stringify(data.data));
		} else {
			if (!tries || tries < 3)
				await this.updateUser(tries ? tries + 1 : 1, 5000 * tries);
			else {
				localStorage.clear();
			}

		}
	}
	async updateSchedule() {
		axios.get("https://api.hwbounty.help/schedule/@me").then(data => {
			if (data && data.status === 200) {
				localStorage.setItem("cachedSchedule", JSON.stringify(data.data));
			}
		}).catch(console.trace);
		axios.get("https://api.hwbounty.help/sgy/getZoomLinks").then(data => {
			if (data && data.status === 200) {
				localStorage.setItem("cachedCourseInfo", JSON.stringify(data.data));
			}
		}).catch(console.trace);

	}
	componentDidMount() {
		let oldPageUrl = "";
		setInterval(() => {
			if (oldPageUrl !== this.props.location.pathname) {
				oldPageUrl = this.props.location.pathname;
				this.updateCache();
			}
		}, 1000);
	}
	async updateCache() {
		this.updateUser();
		this.updateSchedule();
	}
	render() {
		// this.updateCache();
		return null;
	}
}
export default connect()(withRouter(LoadIntoCache));