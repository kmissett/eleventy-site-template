const searchForm = document.querySelectorAll(".search-form")
const searchResultsSection = document.querySelector("#search-results")

searchForm.forEach(form => addEventListener("submit", async (e) => {
    e.preventDefault()
    submitSearch(form)

}))

const searchNavLinks = document.querySelectorAll("a.search")
const searchModal = document.querySelector(".site-search-modal")
searchNavLinks.forEach(link => link.addEventListener("click", (e) => {
    e.preventDefault()
    showSearchModal()
}))


function showSearchModal() {
    searchModal.classList.remove("display-none")
    const searchInput = searchModal.querySelector("input")
    searchInput.focus()
}

// todo: better input sanitization
async function submitSearch(form) {
    const formData = new FormData(form)

    // convert search to lowercase, and remove all html elements
    const searchInput = formData.get("search").toLowerCase()
    const query = searchInput.replace(/(<([^>]+)>)/g, '');

    if(query.length <=0) { return }
    
    // get condensed posts from search.json: 
    const posts = await getPosts()

    // filter by search query
    const filteredPosts = filterPosts(posts,query)
    
    if(filteredPosts.length <= 0) {
        searchResultsSection.innerHTML = `Nothing matched your search "${query}." Try again?`
        return
    }

    // sort posts by date in descending order
    const sortedPosts = sortPosts(filteredPosts)

    // format into article template
    const formattedPosts = sortedPosts.map(formatPost).join("")
    
    // display formatted posts
    searchResultsSection.innerHTML = `<h2>Results for "${query}":</h2>${formattedPosts}`
}


async function getPosts() {
    try {
        const res = await fetch("/search.json")
        if(!res.ok) throw new Error(res.statusText)
        const data = await res.json()
        return data.search
    }
    catch(error) {
        console.log(error)
        return error.message
    }
}

// todo: refactor using Set?
function filterPosts(posts, query) {
    const queryArray = query.split(" ")
    console.log(queryArray)
    let result = []
    queryArray.forEach(term => {
        console.log(`searching ${term}`)
        const matchingPosts = posts.filter((post) => post.title.toLowerCase().includes(term) || post.tags.includes(term) || post.excerpt.includes(term) || post.text.includes(term))
        console.log(matchingPosts)
        matchingPosts.forEach(post => {
            if (!result.includes(post)) {result.push(post)}
        })
    })
    
    return result
}

function sortPosts(posts) {
    const sorted = posts.slice().sort((a,b) => {
        const bDate = new Date(b.date)
        const aDate = new Date(a.date)
        return bDate - aDate
    })
    return sorted
}

function formatPost(post) {
    return `<article>
                <h3 class="post-title"><a href="${post.url}">${post.title}</a></h3>
                <p class="post-excerpt">${post.excerpt}</p>
            </article>`
}
