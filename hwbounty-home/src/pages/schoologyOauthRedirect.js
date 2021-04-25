import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { hwbountyAPI } from "../redux/types";

class SchoologyOauthPage extends Component{
	render(){
		if (window.location.search.match(/\?oauth_token\=/)){
			axios.post(`${hwbountyAPI}/schoologyLogin`,{
				oauth_token: window.location.search.match(/\w+$/)[0]
			}).then(x=>{
				window.location.href = window.location.origin;
			});
		}
		return null;
	}
}
export default connect()(SchoologyOauthPage);