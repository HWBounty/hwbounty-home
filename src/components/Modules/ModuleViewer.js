// React
import { useParams } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// MUI
import { Container } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// Modules
import Calculator from './Calculator/Calculator';
import EssayEditor from './EssayEditor/EssayEditor';
import GasLaws from './GasLaws';

const styles = {
  root: {
    height: '100%',
    flex: 1,
  },
};

export const ModuleViewer = (props) => {
  const { classes } = props;
  let { module } = useParams();

  const Module = (props) => {
    switch (module) {
      case 'calculator':
        return <Calculator />;
      case 'essay':
        return <EssayEditor />;
      case 'gaslawscalc':
        return <GasLaws />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Module />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(ModuleViewer));
