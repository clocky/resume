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

  return {
        templateFormats: ["pug", "njk"],

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