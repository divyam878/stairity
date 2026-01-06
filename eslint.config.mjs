import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Allow using <img> tags - user preference
      "@next/next/no-img-element": "off",
      // Suppress anonymous default export warning
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
