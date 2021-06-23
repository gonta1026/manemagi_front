module.exports = {
  purge: [
    './src/pages/**/*.ts', // TypeScriptの場合は[.js]ではなく[.tsx]
    './src/components/**/*.ts', // TypeScriptの場合は[.js]ではなく[.tsx]
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
