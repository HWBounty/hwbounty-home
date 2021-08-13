import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { useHistory } from 'react-router';

import axios from 'axios';

import { useSnackbar, withSnackbar } from 'notistack';

import { hwbountyAPI } from '../redux/types';
import { setAuthorizationHeader } from '../redux/actions/userActions';

import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  logoButton: {
    height: '2rem',
  },
}));

export const SchoologyButton = (props) => {
  const classes = useStyles(props);
  const onClick = async () => {
    let thing = await axios.post(`${hwbountyAPI}/schoologyAuth`, {
      redirectURL: `${window.location.href}`,
    });
    thing = thing.data || thing;
    if (thing && thing.nonce && thing.url) {
      localStorage.setItem('SchoologyNonce', thing.nonce);
      window.location.href = thing.url;
    }
  };
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  useEffect(() => {
    if (
      window.location.search &&
      window.location.search.match(/\?oauth_token=/)
    ) {
      (async () => {
        let thing = await axios
          .post(`${hwbountyAPI}/schoologyAuth`, {
            redirectURL: `${window.location.origin}/schoologyCallback`,
            oauth_token: window.location.search.split('?oauth_token=').pop(),
            nonce: localStorage.getItem('SchoologyNonce'),
          })
          .catch((er) => {
            enqueueSnackbar(er.response.data.error || er.response.data);
          });
        if (!thing) return;
        setAuthorizationHeader(thing.data);
        enqueueSnackbar('Signed in!');
        setTimeout(() => history.push('/'), 500);
      })();
    }
  }, []);
  return (
    <IconButton onClick={onClick}>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/410R0kTkO4L.png"
        className={classes.logoButton}
      />
    </IconButton>
  );
};

export default connect()(withSnackbar(SchoologyButton));
