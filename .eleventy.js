const pretty = require("pretty");
const moment = require("moment");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);



  /**
   * Plugin: Embed YouTube
   */
  const embedYouTube = require("eleventy-plugin-youtube-embed");

  eleventyConfig.addPlugin(embedYouTube, {
    embedClass: "embed-responsive-item embed-responsive-16by9 mt-5",
    lite: true
  });

  /**
   * Plugin: Embed Vimeo
   */

  const embedVimeo = require("eleventy-plugin-vimeo-embed");

  eleventyConfig.addPlugin(embedVimeo, {
    embedClass: "embed-responsive-item embed-responsive-16by9 mt-5",
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

  eleventyConfig.addShortcode("img", function (asset, shadow = true) {
    let shadowClass = shadow ? "shadow" : "";
    return `</div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <img data-src="${asset}" class="img-fluid lazyload rounded ${shadowClass}" />
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

  const markdownIt = require('markdown-it')({
    html: true
  }
  );
  eleventyConfig.setLibrary("md", markdownIt.use(markdownItAttrs))

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
