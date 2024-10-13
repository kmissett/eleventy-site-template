import htmlmin from "html-minifier-terser"
import { minify } from "terser"

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

// Adapted from https://github.com/pdehaan/11ty-transform-async
async function jsMinify(content, path) {
	if (path.endsWith(".js")) {	
		const minified = await minify(content, {})
		return minified.code
	}
	return content
  };

export default {htmlMinify, jsMinify}