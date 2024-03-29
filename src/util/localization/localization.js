import LANGUAGES from './languages';

let locale = localStorage.getItem('locale')
  ? localStorage.getItem('locale')
  : window.navigator.userLanguage ||
    window.navigator.language in Object.keys(LANGUAGES)
  ? window.navigator.userLanguage || window.navigator.language
  : 'en-US';

export const setLocale = (l) => {
  locale = Object.keys(LANGUAGES).indexOf(l) !== -1 ? l : locale;
  localStorage.setItem('locale', locale);
  location.reload();
};

export const getLocale = () => {
  return locale;
};

export const t = (translationKey, args = {}) => {
  try {
    let searchTree = LANGUAGES[locale];
    for (const section of translationKey.split('.')) {
      searchTree = searchTree[section];
    }

    for (const variable of Object.keys(args)) {
      searchTree = searchTree.replace('{{' + variable + '}}', args[variable]);
    }

    return searchTree;
  } catch {
    let searchTree = LANGUAGES['en-US'];
    for (const section of translationKey.split('.')) {
      searchTree = searchTree[section];
    }

    for (const variable of Object.keys(args)) {
      searchTree = searchTree.replace('{{' + variable + '}}', args[variable]);
    }

    return searchTree;
  }
};

window.t = t;

export default t;
