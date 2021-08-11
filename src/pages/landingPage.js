import React from 'react';

import { Button } from '@material-ui/core';

import { connect } from 'react-redux';

import { useHistory } from 'react-router';

import t from '../util/localization/localization';

export const LandingPage = (props) => {
  const history = useHistory();
  const goToPage = (path) => {
    history.push(path);
  };
  return (
    <Button onClick={() => goToPage('/dashboard')}>
      {t('landingPage.placeholder')}
    </Button>
  );
};
export default connect()(LandingPage);
