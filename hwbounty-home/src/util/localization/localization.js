import LANGUAGES from "./languages";

let locale =
  window.navigator.userLanguage ||
  window.navigator.language in Object.keys(LANGUAGES)
    ? window.navigator.userLanguage || window.navigator.language
    : "en-US";

export const setLocale = (l) => {
  locale = l in Object.keys(LANGUAGES) ? l : locale;
};
