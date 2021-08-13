// React
import React, { useCallback, useEffect, useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { setModule } from '../../redux/actions/uiActions';

// Keybind
import { withShortcut } from 'react-keybind';

export const KeybindManager = (props) => {
  const { shortcut, setModule } = props;

  // const handleNumberPressed = (e) => {
  //   setModule(e.key);
  // };

  // useEffect(() => {
  //   shortcut.registerShortcut(
  //     handleNumberPressed,
  //     ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  //     "Change Module",
  //     "Changes to specified module given the id. 0 will clear"
  //   );
  //   /*
  //   Later make it so that we map through all active keybinds with command
  //   keybind arr will look something like this:
  //   arr = [
  //     {key="c", action="SET_CALC"},
  //     {key="space" action="CLEAR_ALL_MODULES"}
  //   ]
  //   */

  //   return () => {
  //     // Returning from useEffect is equivilant to componentDidUnmount or whatever its called
  //     shortcut.unregisterShortcut([
  //       "0",
  //       "1",
  //       "2",
  //       "3",
  //       "4",
  //       "5",
  //       "6",
  //       "7",
  //       "8",
  //       "9",
  //     ]);
  //   };
  // }, []);
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])
  return null;
};

export default connect(null, { setModule })(withShortcut(KeybindManager));

/*
Shortcut object that we get from withShortcut. This is retrieved from props

shortcut: {
  registerShortcut?: (
    method: (e?: React.KeyboardEvent<any>) => any,
    keys: string[],
    title: string,
    description: string,
    holdDuration?: number,
  ) => void
  registerSequenceShortcut?: (
    method: () => any,
    keys: string[],
    title: string,
    description: string,
  ) => void
  shortcuts: Shortcut[]
  triggerShortcut?: (key: string) => any
  unregisterShortcut?: (keys: string[]) => void
}
*/
