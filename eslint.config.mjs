import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    // generator/ is a standalone package with its own tsconfig
    ignores: [".next/**", "node_modules/**", "generator/**"],
  },
];

export default eslintConfig;
