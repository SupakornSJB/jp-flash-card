# Accessing Different Page
- [Current (wip - Tutorial, etc.)](https://supakornsjb.github.io/jp-flash-card/#/gre)
- [Legacy JP Flash Card](https://supakornsjb.github.io/jp-flash-card/#/legacy)
- [GRE flashcard](https://supakornsjb.github.io/jp-flash-card/#/gre)
- [GRE word list set 1](https://supakornsjb.github.io/jp-flash-card/#/list/1)
- [GRE word list set 2](https://supakornsjb.github.io/jp-flash-card/#/list/2)
- [GRE word list set 3](https://supakornsjb.github.io/jp-flash-card/#/list/3)
- [GRE word list set 4](https://supakornsjb.github.io/jp-flash-card/#/list/4)

# Todo
- Color is broken on Light theme

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
