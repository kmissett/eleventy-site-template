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

export default {squash}