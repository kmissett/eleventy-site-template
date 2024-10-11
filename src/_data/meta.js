export const meta = {
    title: "Site Template",
    shortTitle: "ST",
    description: "Site description",
    favicon: "images/logo.svg",
    logo: "images/logo.svg",
    baseURL: process.env.BASE_URL,
    language: "en-US",
    author: {
        name:  process.env.SITE_AUTHOR || "Site author",
        email: process.env.EMAIL || "abc@def.com",
        phone: {
            display: process.env.PHONE_DISPLAY || "555-555-5555",
            href: process.env.PHONE_HREF || "+15555555555"
        },
    },    
    formAPI: process.env.CONTACT_FORM_API_KEY || 12345
}
