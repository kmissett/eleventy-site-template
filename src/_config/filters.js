import { minify } from "terser"

// Adapted from https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/
const squash = text => {
	let content = new String(text).toLowerCase();
  
	// remove all html elements
	const plain = content.replace(/(<([^>]+)>)/g, '')


	// remove duplicated words
	const words = plain.split(' ')
	const deduped = [...(new Set(words))]
	const dedupedStr = deduped.join(' ')

	// remove short and less meaningful words
	let result = dedupedStr.replace(/\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/g, '')

	//remove newlines, and punctuation
	result = result.replace(/\.|\,|\?|-|—|\n/g, '')

	//remove repeated spaces
	result = result.replace(/[ ]{2,}/g, ' ')

	return result
}

// Adapted from https://moosedog.io/posts/clean-configuration-file-in-eleventy.html
const jsMinify = async function(code, callback) {
	try {
		const minified = await minify(code)
		callback(null, minified.code)
	} catch (err) {
		console.error("Terser error: ", err)
		// Fail gracefully
		callback(null, code)
	}
}

export default {squash, jsMinify}