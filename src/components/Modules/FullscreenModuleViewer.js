// React
import React, { useState, useEffect, useRef } from 'react';

// MUI
import Modal from '@material-ui/core/Modal';

// Modules
import {
  CalculatorFullscreen,
  CalculatorLeftTab,
  CalculatorRightTab,
} from './Calculator/CalculatorFullscreen';

export const FullscreenModuleViewer = (props) => {
  return (
    <Modal>
      <CalculatorFullscreen />
    </Modal>
  );
};

export default FullscreenModuleViewer;
