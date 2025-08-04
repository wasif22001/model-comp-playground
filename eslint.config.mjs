import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add custom rules to address your issues
  {
    rules: {
      // Disable unused variable warning (or change to "warn" to just show a warning)
      "@typescript-eslint/no-unused-vars": ["warn"], // Change to "error" to make it an error

      // Change 'String' to 'string' as the preferred type
      "@typescript-eslint/no-restricted-syntax": [
        "error",
        {
          selector:
            "TSTypeReference[node.type='TSTypeReference' && node.typeName.name='String']",
          message: "Use 'string' instead of 'String'.",
        },
      ],

      // Disable or warn about 'any' type (use 'warn' if you want a warning instead of turning it off)
      "@typescript-eslint/no-explicit-any": "off", // You can use 'warn' if you want it to be a warning instead of disabling

      // Optional: If you want to prevent 'String' in types in general (not just specific cases)
      "@typescript-eslint/no-use-before-define": "error",
    },
  },
];

export default eslintConfig;
