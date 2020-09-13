const pretty = require("pretty");
const moment = require("moment");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(embedYouTube, {
    embedClass: "embed-responsive-item embed-responsive-16by9",
    lite: true
  });

  eleventyConfig.addPassthroughCopy({ "src/_assets/img/": "/img" });
  eleventyConfig.addPassthroughCopy({ "src/_assets/js/": "/js" });
  eleventyConfig.addPassthroughCopy({ "src/_assets/favicon/": "/" });
  eleventyConfig.addPassthroughCopy({ "src/_assets/css/": "/css" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addTransform("pretty", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let prettified = pretty(content, {
        ocd: true,
      });
      return prettified;
    }
    return content;
  });

  eleventyConfig.addNunjucksFilter("date", function (dateObj, format) {
    return moment(dateObj).format(format);
  });

  eleventyConfig.addShortcode("now", function () {
    return moment();
  });

  eleventyConfig.addShortcode("img", function (asset) {
    return `</div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <img data-src="${asset}" class="img-fluid lazyload shadow" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-8 offset-lg-2">`;
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return moment(dateObj).format("YYYY-MM-DD");
  });

  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getFilteredByGlob([
      "src/projects/**/*.md",
      "src/projects/**/*.pug",
    ]);
  });

  return {
    templateFormats: ["md", "pug", "njk"],
    pathPrefix: "/",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_templates",
      data: "_data",
      output: "public",
    },
  };
};
