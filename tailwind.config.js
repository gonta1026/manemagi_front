module.exports = {
  purge: [
    './src/pages/**/*.tsx', // TypeScriptの場合は[.js]ではなく[.tsx]
    './src/components/**/*.tsx', // TypeScriptの場合は[.js]ではなく[.tsx]
  ],
  // darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
