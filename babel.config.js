module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      'react-native-reanimated/plugin',
      [
        "i18next-extract",
        {
          locales: ["en"],
          outputPath: "locales/{{locale}}/{{ns}}.json",
          keyAsDefaultValue: ["en"],
          discardOldKeys: false,
          keySeparator: false,
          nsSeparator: false,
        },
      ],
    ]
  };
};


// i18next extract looks for all the {t("I'm a string")} and extracts them into the en/translation.json 