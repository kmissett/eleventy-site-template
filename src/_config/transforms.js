import htmlmin from "html-minifier-terser"

// from https://www.11ty.dev/docs/transforms/#minify-html-output
const htmlMinify = (content, path) => {
	if(path && path.endsWith(".html")) {
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
	htmlMinify
}