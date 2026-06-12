# Coffee Cove Hawaiʻi Website

Static multi-page website for Coffee Cove Hawaiʻi, a hidden Windward Coast coffee stop in Hauula, O'ahu.

---

## File List

```
coffee-cove-hawaii/
├── index.html
├── menu.html
├── reviews.html
├── visit.html
├── merch.html
├── careers.html
├── contact.html
├── styles.css
├── script.js
└── README.md
```

---

## How to Preview Locally

1. Download or clone all files into a single folder.
2. Open `index.html` in any modern web browser.
3. Navigate between pages using the header navigation.

No server, build tool, or install step is required.

---

## Project Notes

**Static website**
This is a fully static HTML/CSS/JavaScript website. There is no backend, no database, no build step, and no framework. All files can be opened directly from a folder or hosted on any static hosting platform.

**No build tools required**
No Node.js, npm, webpack, or similar tools are needed. The site runs from plain files.

**No frameworks required**
No React, Vue, Tailwind, Bootstrap, or other frameworks are used. All styles are written in `styles.css` and all scripts are written in `script.js`.

**Forms are not connected yet**
The contact form (`contact.html`) and careers form (`careers.html`) are non-functional placeholders. They show a friendly message on submit but do not send any data. Code comments inside each form show how to connect Netlify Forms, Formspree, Google Forms, or a custom backend when ready.

**Review links are placeholders**
Google and Yelp review buttons use `href="#"` until real review URLs are added. `script.js` intercepts these clicks and shows a message rather than jumping to the top of the page. Replace `href="#"` with real Google Business Profile and Yelp URLs before launch.

**Merch checkout is not active**
Merch product buttons use `data-merch-button` and show an informational message when clicked. No cart, checkout, or payment flow is active. Code comments in `merch.html` show where to connect Clover, Intuit, Shopify Starter, or another payment link when ready.

**Weather uses Open-Meteo**
The weather and sunrise card on `visit.html` pulls live data from [Open-Meteo](https://open-meteo.com/) — no API key required. Temperature is always shown in Fahrenheit. If the fetch fails or times out, graceful fallback messages are shown automatically.

---

## Launch Checklist

Before going live, confirm each item below.

**Review links**
- [ ] Replace all `href="#"` review buttons with real Google Business Profile review URLs
- [ ] Replace all `href="#"` leave-a-review buttons with real Google review submission URLs
- [ ] Replace all `href="#"` Yelp buttons with real Yelp business page and review URLs

**Forms**
- [ ] Connect the contact form in `contact.html` to Netlify Forms, Formspree, or another handler — or leave as is if phone/Instagram contact is sufficient
- [ ] Connect the careers form in `careers.html` to a form handler — or leave as is if direct contact is preferred

**Photos**
- [ ] Add real photos if available, stored in an `images/` folder, and update `src` attributes accordingly
- [ ] If keeping CSS-based visual placeholders, confirm they look correct on all pages at mobile and desktop sizes

**Social sharing images**
- [ ] Add real Open Graph images for each page, or remove `og:image` meta tags if images are not ready
- [ ] OG image paths currently reference `https://www.coffeecovehawaii.com/images/` — update to match real hosted image URLs

**Links and contact details**
- [ ] Test Google Maps link on all pages
- [ ] Test Apple Maps link on all pages
- [ ] Test phone link (`tel:+18088309000`) on a real mobile device
- [ ] Test Instagram link (`@coffeecovehawaii`) opens correctly
- [ ] Confirm address is correct: 53-360 Kamehameha Hwy, Hauula, HI 96717
- [ ] Confirm phone is correct: (808) 830-9000

**Hours**
- [ ] Confirm current hours before launch
- [ ] Hours on every page: Monday–Thursday 6 AM–4 PM, Friday–Sunday 6 AM–5 PM
- [ ] Update hours in the footer and visit page if they change

**Mobile**
- [ ] Test every page on a real mobile device or browser dev tools at 375px and 390px width
- [ ] Confirm mobile sticky action bar (Menu, Directions, Call) works correctly
- [ ] Confirm mobile navigation toggle opens and closes correctly
- [ ] Confirm all buttons are tappable and clearly visible at mobile size

**Canonical URLs**
- [ ] Update all `<link rel="canonical">` tags to match the final live domain
- [ ] Update all `og:url` meta tags to match the final live domain

**Deployment**
- [ ] Upload all files to hosting provider (Netlify, GitHub Pages, or any static host)
- [ ] Confirm all pages load without errors
- [ ] Confirm `styles.css` and `script.js` load correctly on every page
- [ ] Confirm no console errors in browser developer tools

---

## Hosting

This site is compatible with any static hosting platform, including:

- [Netlify](https://www.netlify.com/) — drag and drop the project folder to deploy instantly
- [GitHub Pages](https://pages.github.com/) — push to a repository and enable Pages in settings
- Any web host that supports static HTML files

---

## Contact

Coffee Cove Hawaiʻi
53-360 Kamehameha Hwy, Hauula, HI 96717
(808) 830-9000
[instagram.com/coffeecovehawaii](https://www.instagram.com/coffeecovehawaii/)
