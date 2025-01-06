const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    // Add syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);
    
    // Handle asset copying
    eleventyConfig.addPassthroughCopy("articles/images");
    eleventyConfig.addPassthroughCopy("assets");
    
    // Process Markdown links and images
    eleventyConfig.addTransform("content-processing", function(content) {
        // Convert wiki-style links to regular markdown links
        content = content.replace(/\[\[(.*?)\]\]/g, function(match, p1) {
            const [title, alias] = p1.split("|");
            const displayText = alias || title;
            const url = title.toLowerCase().replace(/ /g, "-");
            return `[${displayText}](/${url})`;
        });
        
        // Fix image paths if needed
        content = content.replace(/!\[\[(.*?)\]\]/g, function(match, p1) {
            return `![${p1}](/images/${p1})`;
        });
        
        return content;
    });

    // Configure markdown processing
    let markdownIt = require("markdown-it");
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };
    
    eleventyConfig.setLibrary("md", markdownIt(options));

    return {
        dir: {
            input: "*.md",    // Look for source files in articles directory
            output: "_site",      // Output to _site directory
            includes: "_includes"  // Look for includes in parent directory
        },
        pathPrefix: "/articles/",         // Update this if site is not at root of domain
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: "njk"
    };
};
