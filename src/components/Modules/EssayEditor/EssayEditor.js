// React
import React from 'react';

// MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Translation
import t from '../../../util/localization/localization';

const styles = (theme) => ({
  ...theme.spreadIt,
});

export const EssayEditor = (props) => {
  const { classes } = props;

  // Do some redux thingy to set module to EssayEditor. This will tell hwbounty which module to go to on fullscreen (f)
  return (
    <Paper className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        style={{ height: '100%' }}
      >
        <Typography variant="h5">
          {t('essayEditor.enableFullscreen')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default withStyles(styles)(EssayEditor);
