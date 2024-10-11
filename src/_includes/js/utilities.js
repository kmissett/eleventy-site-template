/* remove any noscript items */
const noscripts = document.querySelectorAll('.noscript')
if (noscripts.length) noscripts.forEach(item => {item.classList.add('display-none')})
