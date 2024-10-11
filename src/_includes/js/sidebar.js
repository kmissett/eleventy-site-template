const time = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--time").split(/[A-Za-z]+/)[0])

const openSidebarButton = document.querySelector(".open-sidebar-button")
const closeSidebarButton = document.querySelector(".close-sidebar-button")

const siteSidebar = document.querySelector(".site-sidebar")
const sidebarNavItems = siteSidebar.querySelectorAll("li > *")
const firstSidebarItem = sidebarNavItems[0]
const lastSidebarItem = sidebarNavItems[sidebarNavItems.length - 1]

const openSidebar = () => {
    document.body.classList.add("sidebar-open")
    siteSidebar.ariaExpanded = true
    openSidebarButton.ariaExpanded = true
    setTimeout(() => closeSidebarButton.focus(), time)

    /* add event listeners */
    closeSidebarButton.addEventListener("click", closeSidebar)
    document.addEventListener("keyup", closeSidebarOnEscape)
    document.addEventListener("click", closeSidebarOnClick)
    firstSidebarItem.addEventListener("keydown", cycleFocusToLastSidebarLink)
    lastSidebarItem.addEventListener("keydown", cycleFocusToFirstSidebarLink)
}

const closeSidebar = () => {
    document.body.classList.remove("sidebar-open")
    siteSidebar.ariaExpanded = false
    openSidebarButton.ariaExpanded = false
    setTimeout(() => openSidebarButton.focus(), time)

    /* remove event listeners */
    closeSidebarButton.removeEventListener("click", closeSidebar)
    document.removeEventListener("keyup", closeSidebarOnEscape)
    document.removeEventListener("click", closeSidebarOnClick)
    firstSidebarItem.removeEventListener("keydown", cycleFocusToLastSidebarLink)
    lastSidebarItem.removeEventListener("keydown", cycleFocusToFirstSidebarLink)
}

const closeSidebarOnEscape = (e) => { if (e.key === "Escape") closeSidebar()}
const closeSidebarOnClick = (e) => { if (e.target === document.querySelector(".sidebar-open")) closeSidebar()}

const cycleFocusToFirstSidebarLink = (e) => {
    if(e.key === "Tab" && !e.shiftKey) {
        e.preventDefault()
        firstSidebarItem.focus()
    }
}
const cycleFocusToLastSidebarLink = (e) => {
    if(e.key === "Tab" && e.shiftKey) {
        e.preventDefault()
        lastSidebarItem.focus()
    }
}

const closeSidebarOnClickLink = (e) => {
    e.preventDefault()
    closeSidebar()
    setTimeout(() => window.location.href = e.target.href, time)
}


/* event listeners */
openSidebarButton.addEventListener("click", openSidebar)
