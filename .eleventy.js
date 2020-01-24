const pretty = require('pretty');
const moment = require("moment");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  eleventyConfig.addPassthroughCopy({"src/_assets/img/": "/img"});
  eleventyConfig.addPassthroughCopy({"src/_assets/favicon/": "/"});
  eleventyConfig.addPassthroughCopy({"src/_assets/css/": "/css"});

  eleventyConfig.addTransform("pretty", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let prettified = pretty(content, {
        ocd: true,
      });
      return prettified;
    }
    return content;
  });

  eleventyConfig.addNunjucksFilter("date", function(dateObj, format) {
    return moment(dateObj).format(format);
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return moment(dateObj).format('YYYY-MM-DD')
  });

  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob(["src/projects/**/*.md", "src/projects/**/*.pug"]);
  });

  return {
      templateFormats: [
          "md", 
          "pug", 
          "njk"
      ],
      pathPrefix: "/",
      htmlTemplateEngine: "njk",
      passthroughFileCopy: true,
      dir: {
        input: "src",
        includes: "_templates",
        data: "_data",
        output: "public"
      }
  }
}
