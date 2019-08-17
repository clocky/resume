module.exports = function(eleventyConfig) {
  var pretty = require('pretty');
  eleventyConfig.addTransform("pretty", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let prettified = pretty(content, {
        ocd: true,
      });
      return prettified;
    }
    return content;
  });
  
  eleventyConfig.addPassthroughCopy("assets");
const moment = require("moment");

// date filter
eleventyConfig.addNunjucksFilter("date", function(date, format) {
  return moment(date).format(format);
});


  return {
        templateFormats: ["md", "pug", "njk"],

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