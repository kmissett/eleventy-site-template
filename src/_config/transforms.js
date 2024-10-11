import htmlmin from "html-minifier-terser"

// from https://www.11ty.dev/docs/transforms/#minify-html-output
const htmlminify = content => {
	if(this.page.outputPath && this.page.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			})
			return minified
	}
	return content
}


export default {
	htmlminify
}