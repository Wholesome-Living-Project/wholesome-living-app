module.exports = {
  "plugins": [
    "@typescript-eslint/eslint-plugin",
    "10x",
    "prettier",
    "react-hooks",
    "eslint-plugin-no-inline-styles"
  ],
  extends: 'next',
  "rules": {
    "indent": "off",
    "react/display-name": "off",
    "no-inline-styles/no-inline-styles": 2,
    "react/jsx-curly-brace-presence": "off",
    "require-atomic-updates": "off",
    "react-hooks/exhaustive-deps": "error",
    "10x/no-full-import": "error",
    "10x/react-in-scope": "off",
    "10x/auto-import": [
      "error",
      {
        "imports": {
          "styled": "import styled from 'styled-components'",
          "lighten": "import {lighten} from 'polished'",
          "format": "import {format} from 'date-fns'"
        }
      }]
  },
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  root: true,
}
