import dotenv from "dotenv"
dotenv.config()

import collections from "./src/_config/collections.js"
import filters from "./src/_config/filters.js"
import transforms from "./src/_config/transforms.js"

export default async function(eleventyConfig) {

	// add watch targets
	eleventyConfig.addWatchTarget("./src/_includes/scss")
	eleventyConfig.addWatchTarget("./src/_includes/js")

	// collections
	eleventyConfig.addCollection("posts", collections.getAllPosts)
	eleventyConfig.addCollection("publicPosts", collections.getPublicPosts)
	eleventyConfig.addCollection("tagsList", collections.tagsList)

	// filters
	eleventyConfig.addFilter("squash", filters.squash)
	eleventyConfig.addNunjucksAsyncFilter("jsmin", filters.jsMinify)

	// shortcodes
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)

	// passthrough copies
	eleventyConfig.addPassthroughCopy("src/images")
	eleventyConfig.addPassthroughCopy("src/fonts")
	eleventyConfig.addPassthroughCopy("src/video")
	eleventyConfig.addPassthroughCopy("src/files")

	// don't copy passthrough files on serve (only on build or watch)
  	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");


	// Transforms
	// TODO: Bundle and minify JS files
	eleventyConfig.addTransform("htmlmin", transforms.htmlMinify)

	// Layout aliases
	eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

	// general config
	return {
		
		// Control which files Eleventy will process
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// pre-process files with njk
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",

		dir: {
			input: "src",
			output: "public",
		}
	}
}