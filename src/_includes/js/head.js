/* remove any noscript items */
const noscripts = document.querySelectorAll('.noscript')
if (noscripts.length) noscripts.forEach(item => {item.classList.add('display-none')})

/* color mode functions */
function getColorMode() {
    if(localStorage.currentColorMode) return localStorage.currentColorMode
    if(window.matchMedia("prefers-color-scheme: light").matches) return "light"
    return "dark"
}

function setColorMode(mode) {
    localStorage.setItem("currentColorMode", mode)
    mode === "light" ? document.documentElement.classList.add("light-mode") : document.documentElement.classList.remove("light-mode")
}

function changeColorMode() {
    const currentColorMode = localStorage.currentColorMode || "dark"
    currentColorMode === "dark" ? setColorMode("light") : setColorMode("dark")
}

document.addEventListener("DOMContentLoaded", (event) => {
    setColorMode(getColorMode())
    const colorModeToggle = document.querySelectorAll('.color-mode-toggle')
    colorModeToggle.forEach(element => { element.addEventListener('click', changeColorMode)})
})