const pretty = require('pretty');
const moment = require("moment");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const typesetPlugin = require('eleventy-plugin-typeset');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPlugin(typesetPlugin({
      disable: [
        "ligatures"
      ]
    })
  );

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
        input: "_site",
        includes: "_templates",
        data: "_data",
        output: "public"
      }
  }
}
