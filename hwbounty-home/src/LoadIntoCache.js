import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LoadIntoCache extends Component{
	constructor(props){
		super(props);
	}
	async updateUser(){
		let data = await axios.get("https://api.hwbounty.help/@me").catch(console.trace);
		if (data && data.status === 200 && data.data){
			localStorage.setItem("user",JSON.stringify(data.data));
		}
	}
	async updateSchedule(){
		axios.get("https://api.hwbounty.help/schedule/@me").then(data=>{
			if (data && data.status === 200){
				localStorage.setItem("cachedSchedule",JSON.stringify(data.data));
			}
		}).catch(console.trace);
		axios.get("https://api.hwbounty.help/sgy/getZoomLinks").then(data=>{
			if (data && data.status === 200){
				localStorage.setItem("cachedCourseInfo",JSON.stringify(data.data));
			}
		})

	}
	componentDidMount(){
		let oldPageUrl = "";
		setInterval(()=>{
			if (oldPageUrl !== this.props.location.pathname){
				oldPageUrl = this.props.location.pathname;
				this.updateCache();
			}
		},1000);
	}
	async updateCache(){
		this.updateUser();
		this.updateSchedule();
	}
	render(){
		// this.updateCache();
		return null;
	}
}
export default connect()(withRouter(LoadIntoCache));