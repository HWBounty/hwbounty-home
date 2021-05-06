// React
import React, { useEffect, useState } from "react";

// MUI
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import axios from "axios";
import { hwbountyAPI } from "../redux/types";
import { useSnackbar, withSnackbar } from "notistack";
import { useHistory } from "react-router";
import { setAuthorizationHeader } from "../redux/actions/userActions"
export const SchoologyButton = (props) => {
  const onClick = async ()=>{
    let thing = await axios.post(`${hwbountyAPI}/schoologyAuth`,{
      redirectURL: `${window.location.href}`
    });
    thing = thing.data || thing;
    if (thing && thing.nonce && thing.url){
      localStorage.setItem("SchoologyNonce",thing.nonce);
      window.location.href = thing.url;
    }
  }
	const { enqueueSnackbar } = useSnackbar();
  const history = useHistory()
  useEffect(()=>{
    if (window.location.search && window.location.search.match(/\?oauth_token=/)){
      (async ()=>{
        let thing = await axios.post(`${hwbountyAPI}/schoologyAuth`,{
        redirectURL: `${window.location.href}`,
        "oauth_token": window.location.search.split("?oauth_token=").pop(),
        nonce: localStorage.getItem("SchoologyNonce")
      }).catch(er=>{
        console.log(er);
        enqueueSnackbar(er.response.data.error || er.response.data);
      });
      if (!thing) return;
      setAuthorizationHeader(thing.data)
      setTimeout(()=>history.push("/"),500);
        
      })()
      
    }
  },[]);
  return (
    <Button onClick={onClick}>
        Authenticate With Schoology
    </Button>
  );
};


export default connect()(withSnackbar(SchoologyButton));
