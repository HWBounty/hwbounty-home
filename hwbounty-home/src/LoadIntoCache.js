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
		let response;
		let data = await axios.get("https://api.hwbounty.help/@me").catch((er) => { response = er.response });
		console.log("data", data);
		if (data && data.status === 200 && data.data) {
			localStorage.setItem("user", JSON.stringify(data.data));
		} else {
			if (response.status !== 500 && (!tries || tries < 3))
				await this.updateUser(tries ? tries + 1 : 1, 5000 * tries);
			else {
				localStorage.removeItem("");
			}

		}
	}
	async updateSchedule() {
		axios.get("https://api.hwbounty.help/schedule/@me").then(data => {
			if (data && data.status === 200) {
				localStorage.setItem("cachedSchedule", JSON.stringify(data.data));
			}
		}).catch(() => { });
		axios.get("https://api.hwbounty.help/sgy/getZoomLinks").then(data => {
			if (data && data.status === 200) {
				localStorage.setItem("cachedCourseInfo", JSON.stringify(data.data));
			}
		}).catch(() => { });

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
const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});
export default connect(mapStateToProps)(withRouter(LoadIntoCache));