import dotenv from "dotenv"
dotenv.config()

import collections from "./src/_config/collections.js"
import filters from "./src/_config/filters.js"
import transforms from "./src/_config/transforms.js"

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"

export default async function(eleventyConfig) {

	// plugins
	eleventyConfig.addPlugin(syntaxHighlight)

	// add watch targets
	eleventyConfig.addWatchTarget("./src/_includes/scss")
	eleventyConfig.addWatchTarget("./src/_includes/js")

	// collections
	eleventyConfig.addCollection("posts", collections.getAllPosts)
	eleventyConfig.addCollection("publicPosts", collections.getPublicPosts)
	eleventyConfig.addCollection("tagsList", collections.getTagsList)

	// filters
	eleventyConfig.addFilter("postDate", filters.postDate)
	eleventyConfig.addFilter("squash", filters.squash)

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
	eleventyConfig.addTransform("htmlmin", transforms.htmlMinify)
	eleventyConfig.addTransform("jsmin", transforms.jsMinify)

	// Layout aliases
	eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

	// general config
	return {
		
		// Control which files Eleventy will process
		templateFormats: ["md", "njk", "html", "liquid"],

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