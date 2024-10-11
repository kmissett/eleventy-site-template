export const title = "Site Template"
export const shortTitle = "ST"
export const description = "Site description"
export const favicon = "images/logo.svg"
export const logo = "images/logo.svg"
export const baseURL = process.env.BASE_URL
export const language = "en-US"
export const author = {
    name:  process.env.SITE_AUTHOR || "Site author",
    email: process.env.EMAIL || "abc@def.com",
    phone: {
        display: process.env.PHONE_DISPLAY || "555-555-5555",
        href: process.env.PHONE_HREF || "+15555555555"
    }
}
export const formAPI = process.env.CONTACT_FORM_API_KEY || 12345
