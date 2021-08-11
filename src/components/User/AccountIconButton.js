/* eslint-disable no-restricted-globals */
import React, { Fragment } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import { connect } from 'react-redux';

import axios from 'axios';

import t from '../../util/localization/localization';

export const AccountIconButton = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    user: { authenticated },
  } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAuthLogs = () => {
    if (localStorage.getItem('DBIdToken')) {
      localStorage.clear();
      location.reload();
      // return ;
    } else {
      //literal mega hack
      location.href = location.href
        .split('/')
        .slice(0, -1)
        .concat('login')
        .join('/');
    }
  };
  const openSchoologyOAuth = () => {
    axios({
      method: 'post',
      url: 'https://api.hwbounty.help/schoologyLogin',
      data: {
        redirectURL: 'hwbounty.help',
      },
    })
      .then((res) => {
        const newWindow = window.open(
          res.data,
          '_blank',
          'noopener,noreferrer'
        );
        if (newWindow) newWindow.opener = null;
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          src={JSON.parse(localStorage.getItem('user'))?.pfp}
          style={{
            maxHeight: 40,
            maxWidth: 40,
            borderRadius: 20,
          }}
          alt=""
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={openSchoologyOAuth}>
          {t('accountIconButton.profile')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {t('accountIconButton.myProfile')}
        </MenuItem>
        <MenuItem onClick={handleAuthLogs}>
          {localStorage.getItem('DBIdToken') ? 'Logout' : 'Login'}
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AccountIconButton);
