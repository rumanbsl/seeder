const postcssRustHelpers = require("./tailwind.rust.extractor");
const { resolve } = require("path");

module.exports = () => {
  const PROJECT_ROOT = resolve(__dirname, "..");
  const mode = process.env.NODE_ENV || "production";
  const usedCssClasses =
    mode === "production"
      ? postcssRustHelpers.getUsedCssClasses()
      : null;

  return {
    plugins: [
      require("postcss-import"),
      require("tailwindcss")(`${PROJECT_ROOT}/build-configs/tailwind.config.js`),
      require("postcss-typed-css-classes")({
        output_filepath: `${PROJECT_ROOT}/src/tailwind.rs`,
        generator: "rust",
        filter: class_ => {
          if (mode === "production") {
            return usedCssClasses.has(
              postcssRustHelpers.escapeClassName(class_)
            );
          } else {
            return true;
          }
        }
      }),
      require("autoprefixer")
    ]
  };
};
