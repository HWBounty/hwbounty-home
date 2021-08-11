import React from 'react';
import PropTypes from 'prop-types';

// MUI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Redux
import { connect } from 'react-redux';

import { setTheme } from '../redux/actions/uiActions';

import { useSnackbar } from 'notistack';

// Translation
import t, { getLocale, setLocale } from '../util/localization/localization';
import { NAMES } from '../util/localization/languages';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  paper: {
    width: '80vw',
    height: '80vw',
    display: 'inline-block',
  },
  title: {
    fontSize: '60px',
    // fontFamily: "",
  },
  formLabel: {
    display: 'block',
  },
  formGroup: {
    display: 'inline',
  },
}));
export const Settings = (props) => {
  const classes = useStyles();
  const {
    UI: { theme },
    setTheme,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const toggleDarkmode = (event, nv) => {
    const newVal = nv ? 1 : 0;
    if (newVal === 0) enqueueSnackbar('Ouchy, my eyes');
    else enqueueSnackbar('Ahhhh much better');
    localStorage.setItem('theme', newVal);
    setTheme(newVal);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        {t('settings.title')}
      </Typography>
      <FormGroup row className={classes.formGroup}>
        <FormControlLabel
          control={
            <Switch
              checked={theme === 1}
              onChange={toggleDarkmode}
              name="darkmodeToggle"
            />
          }
          label={t('settings.darkModeLabel')}
          className={classes.formLabel}
        />
        {/* <FormControlLabel
					control={
						<Switch
							checked={state.checkedB}
							onChange={handleChange}
							name="checkedB"
							color="primary"
						/>
					}
					label="Primary"
				/>
				<FormControlLabel control={<Switch />} label="Uncontrolled" />
				<FormControlLabel disabled control={<Switch />} label="Disabled" />
				<FormControlLabel disabled control={<Switch checked />} label="Disabled" /> */}
      </FormGroup>
      <Autocomplete
        options={Object.keys(NAMES)}
        getOptionLabel={(option) => NAMES[option]}
        style={{ width: '40%', marginLeft: '30%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('settings.language')}
            variant="outlined"
          />
        )}
        value={getLocale()}
        onChange={(_, value) => setLocale(value)}
      />
    </Paper>
  );
};
Settings.propTypes = {
  setTheme: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { setTheme })(Settings);
