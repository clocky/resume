const dayjs = require("dayjs");
const path = require("path");
const prettier = require("prettier");

module.exports = function (eleventyConfig) {
  /** Copy Netlify Headers file */
  eleventyConfig.addPassthroughCopy("_headers");

  /** Copy Favicons */
  eleventyConfig.addPassthroughCopy("src/*.png");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  /** Watch SASS files for changes */
  eleventyConfig.addWatchTarget("./src/sass/");

  /** Watch data source file for changes */
  eleventyConfig.addWatchTarget("./src/_data/");

  /** Add a filter to format inline dates for <time> tags */
  const formatDate = (date, format) => dayjs(date).format(format);
  eleventyConfig.addFilter("formatDate", formatDate);

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser });

      default:
        return content;
    }
  });
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
