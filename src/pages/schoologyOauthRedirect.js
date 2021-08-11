import axios from 'axios';

import { useSnackbar, withSnackbar } from 'notistack';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { setAuthorizationHeader } from '../redux/actions/userActions';
import { hwbountyAPI } from '../redux/types';

export const SchoologyOauthPage = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  if (window.location.search.match(/\?oauth_token\=/)) {
    axios
      .post(`${hwbountyAPI}/schoologyAuth`, {
        redirectURL: `${window.location.href}`,
        oauth_token: window.location.search.match(/\w+$/)[0],
        nonce: localStorage.getItem('SchoologyNonce'),
      })
      .then((thing) => {
        if (!thing) return;
        setAuthorizationHeader(thing.data);
        enqueueSnackbar('Signed in!');
        setTimeout(() => history.push('/'), 500);
      });
  }
  return null;
};
export default connect()(withSnackbar(SchoologyOauthPage));
