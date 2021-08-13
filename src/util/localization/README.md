# Localization

Localization will be very helpful later on when HWBounty starts to get translated into other languages. It uses a translator function, `t` to take a key and translate it into the users current language.

## `t`

`t` is a function exported from `src/util/localization/localization`, it takes in a key and optional arguments (defaults to `{}`) in the form of an object, these arguments will be explained in the next section

`t` is also assigned to `window.t`, which can be used instead of importing

## Adding Keys

To add keys go to `src/util/localization/langs` and pick out the language file you wish to change, in there is an exported object with multiple objects inside of it, to flatten out these objects the name are just joined with a `.`, as an example:

```js
test: {
    test: "test",
},
```

would be `t("test.test")`, you are also able to add arguments too for text has has values that change:

```
test: {
    test: "test, {{arg}}",
},
```

You are able to call this like `t("test.test", {arg: "hi"})` and it would return `test, hi`

## Adding languages

Add a new language file to the `langs` folder and then in `languages.js` change `LANGUAGES` to include your new language with the locale it is accociated with

## Setting locale,

Just use the `setLocale` in `localization.js`, if it is not in the current language list it will default to `en-US`
