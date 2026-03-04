import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import css from "@eslint/css";
import { tailwind3 } from "tailwind-csstree";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    languageOptions: {
      customSyntax: tailwind3,
    },
    rules: {
      ...css.configs.recommended.rules,
      "css/use-baseline": "off",
    },
  },
  eslintConfigPrettier,
  globalIgnores([".next/**"]),
]);

export default eslintConfig;
