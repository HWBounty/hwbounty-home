import LANGUAGES from "./languages";

let locale =
  window.navigator.userLanguage ||
  window.navigator.language in Object.keys(LANGUAGES)
    ? window.navigator.userLanguage || window.navigator.language
    : "en-US";

export const setLocale = (l) => {
  locale = l in Object.keys(LANGUAGES) ? l : locale;
};

export const t = (translationKey, args = {}) => {
  let searchTree = LANGUAGES[locale];
  for (const section of translationKey.split(".")) {
    searchTree = searchTree[section];
  }

  for (const variable of Object.keys(args)) {
    searchTree = searchTree.replace("{{" + variable + "}}", args[variable]);
  }

  return searchTree;
};

export default t;
