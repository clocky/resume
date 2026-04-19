import dayjs from "dayjs";
import path from "path";
import { format } from "prettier";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("src/*.png");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addWatchTarget("./src/_data/");

  eleventyConfig.addFilter("formatDate", (date, fmt) => dayjs(date).format(fmt));

  eleventyConfig.addTransform("prettier", async function (content, outputPath) {
    if (path.extname(outputPath) === ".html") {
      return await format(content, { parser: "html" });
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
