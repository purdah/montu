import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.ts"]},
  {languageOptions: { globals: globals.browser }},
  {ignores: [".node_modules/*"]},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];