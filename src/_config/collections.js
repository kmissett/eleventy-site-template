const getAllPosts = collection => {
	return collection.getFilteredByGlob("./src/blog/*")
}

const getPublicPosts = collection => {
	const now = new Date()
	const posts = collection.getFilteredByGlob("./src/blog/*")
	return posts.filter(post => !post.data.draft && post.data.date < now)
}

const getTagsList = collection => {
	const tagsSet = new Set()
	collection.getAll().forEach( item => {
			if (!item.data.tags) return
			item.data.tags.map( tag => tagsSet.add(tag))
		}
	)
	return Array.from(tagsSet).sort()
}

export default {getAllPosts, getPublicPosts, getTagsList}