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


setColorMode(getColorMode())
const colorModeToggle = document.querySelectorAll('.color-mode-toggle')
colorModeToggle.forEach(element => { element.addEventListener('click', changeColorMode)})