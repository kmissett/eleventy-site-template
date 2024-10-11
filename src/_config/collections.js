const getAllPosts = collection => {
	return collection.getFilteredByGlob("./src/blog/*.md")
}

const getPublicPosts = collection => {
	const now = new Date()
	const posts = collection.getFilteredByGlob("./src/blog/*.md")
	return posts.filter(post => post.data.publish && post.data.date < now)
}

const tagsList = collection => {
	const tagsSet = new Set()
	collection.getAll().forEach( item => {
			if (!item.data.tags) return
			item.data.tags.map( tag => tagsSet.add(tag))
		}
	)
	return Array.from(tagsSet).sort()
}

export default {getAllPosts, getPublicPosts, tagsList}