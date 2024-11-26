const contactForm = document.querySelector('.contact-form')

// TODO: get .env to work with this
contactForm.action = ""
contactForm.method = "POST"

const submittedName = contactForm.querySelector('#name')
const email = contactForm.querySelector('#email')
const message = contactForm.querySelector('#message')
const submitButton = contactForm.querySelector('.submit')

const fields = [submittedName, email, message]
fields.forEach(field => field.addEventListener('change', validateInput))
setInterval(enableSubmit, 1000)

function validateInput() {
    const email_re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phone_re = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    if (this.value.trim() === "") {
        this.classList.add('is-invalid')
        this.parentElement.children[2].innerText = "This is a required field."; return
    }
    if (this.type == "email" && !email_re.test(email.value)) {
        this.classList.add('is-invalid')
        this.parentElement.children[2].innerText = "This is not a valid email address."; return
    }
    this.classList.remove('is-invalid')
    this.parentElement.children[2].innerText = "";return
}

function enableSubmit() {
    const inputsFilled = (
        submittedName.value.trim() !== "" && 
        email.value.trim() !== "" && 
        message.value.trim() !== ""
    )
    const inputsValid = !(
        submittedName.classList.contains('is-invalid') || 
        email.classList.contains('is-invalid') ||
        message.classList.contains('is-invalid')
    )
    
    if (inputsFilled && inputsValid) {
        submitButton.ariaDisabled = false
        return
        }
    submitButton.ariaDisabled = true
}

const preventSubmit = (e) => { if (submitButton.ariaDisabled) e.preventDefault()}
submitButton.addEventListener('click', preventSubmit)