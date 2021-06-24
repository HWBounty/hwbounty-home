// React
import React from "react";
import PropTypes from "prop-types";

// MUI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";

const useStyles = makeStyles({
  numPadRoot: {},
  symbolPadRoot: {},
  button: {
    //backgroundColor: (props) =>
    //props.UI.theme === 1 ? "rgb(63,63,63)" : "rgb(243,243,243)",
    //flex: 1,
  },
});

const SymbolButton = (props) => {
  const { onClick, latex, symbol } = props;
  const classes = useStyles(props);
  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => onClick(latex)}
    >
      {symbol}
    </Button>
  );
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});
export const NumPad = connect(mapStateToProps)((props) => {
  const classes = useStyles(props);
  const {
    onClick,
    UI: { theme },
  } = props;

  const NumRow = ({ arr }) => {
    return (
      <Grid container item spacing={1} wrap="nowrap">
        {React.Children.toArray(
          arr.map((num) => (
            <Grid item>
              {num !== null ? (
                <SymbolButton onClick={onClick} latex={num} symbol={num} />
              ) : (
                <Button
                  className={classes.button}
                  variant="contained"
                  disabled
                />
              )}
            </Grid>
          ))
        )}
      </Grid>
    );
  };
  return (
    <Grid container spacing={1} wrap="nowrap" direction="column">
      <NumRow arr={[1, 2, 3]} />
      <NumRow arr={[4, 5, 6]} />
      <NumRow arr={[7, 8, 9]} />
      <NumRow arr={[null, 0, "."]} />
    </Grid>
  );
});

export const SymbolPad = (props) => {
  const { onClick } = props;
  const symbols = [
    { symbol: "+", latex: "+" },
    { symbol: "-", latex: "-" },
    { symbol: "*", latex: "cdot" },
    { symbol: "/", latex: "frac" },
    { symbol: "√", latex: "sqrt" },
    { symbol: "^", latex: "^" },
  ];

  return (
    <div>
      <Grid container spacing={1}>
        <Grid container item spacing={1}>
          {React.Children.toArray(
            symbols.map((obj) => {
              return (
                <Grid item>
                  <SymbolButton
                    onClick={onClick}
                    latex={obj.latex}
                    symbol={obj.symbol}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
      </Grid>
    </div>
  );
};

NumPad.propTypes = {
  onClick: PropTypes.func.isRequired,
};

SymbolPad.propTypes = {
  onClick: PropTypes.func.isRequired,
};
