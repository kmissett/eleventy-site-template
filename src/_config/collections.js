
/*
const getAllPosts = collection => {
	return collection.getFilteredByGlob("./src/blog/posts/*")
} 

const getPublicPosts = collection => {
	const now = new Date()
	const posts = collection.getFilteredByGlob("./src/blog/posts/*")
	return posts.filter(post => post.data.draft == "false" && post.data.date < now)
}
*/

const getAllPosts = collection => {
	return collection.getFilteredByTag("post")
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

export default {getAllPosts, getTagsList}