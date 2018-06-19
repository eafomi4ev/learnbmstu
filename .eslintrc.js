module.exports = {
  "plugins": [
    "react"
  ],
  "extends": "google",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "modules": true,
      "spread": true,
      "restParams": true,
      "jsx": true,
      "experimentalObjectRestSpread": true,
    },

  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "new-cap": ["error", { "capIsNew": false }],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "padded-blocks": [1, "never"],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": false,
        "MethodDefinition": false,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": false,
      },
    }],
    "max-len": ["error", 120],
  },
};
