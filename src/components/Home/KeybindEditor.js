// React
import React from 'react';

// Translation
import t from '../../util/localization/localization';

export const KeybindEditor = (props) => {
  return (
    <div>
      <h1>{t('keybindEditor.keybindsTitle')}</h1>
      <ul>
        <li>{t('keybindEditor.keybinds.calculator')}</li>
        <li>{t('keybindEditor.keybinds.fullscreen')}</li>
        <li>{t('keybindEditor.keybinds.nothing')}</li>
      </ul>
    </div>
  );
};

export default KeybindEditor;
