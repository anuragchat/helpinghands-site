# Helping Hands website

Static site built with [Astro](https://astro.build). Six pages, no database,
deploys free.

## Running it

You need [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.

```bash
npm install     # once, downloads Astro
npm run dev     # starts the site at http://localhost:4321
```

Leave `npm run dev` running while you work. Save a file and the browser updates
by itself.

```bash
npm run build   # produces the real site in dist/
npm run preview # view what build produced, exactly as visitors will see it
```

## Where things live

```
src/
  data/site.js        every editable fact: classes, team, email, stats
  pages/              one file per page — the URL matches the filename
  layouts/            the page shell, used by every page
  components/         header and footer, written once, used everywhere
  styles/global.css   all styling, starting with the color tokens
public/               images, favicon — anything here is served as-is
```

## Editing

**To change a class, a name, an email, or a number:** open `src/data/site.js`.
Nothing else needs touching. That file feeds the home page, the classes page,
the team page, and the footer.

**To rewrite Our story or Support us:** open `src/pages/our-story.md` or
`support.md`. These are plain Markdown — write normally, leave a blank line
between paragraphs, start a heading with `##`. Do not remove the block at the
very top between the `---` lines; that sets the page title.

**To change how something looks:** open `src/styles/global.css`. The variables
at the top control color and typeface across the whole site. Changing `--accent`
changes every accent on every page.

**To add a page:** create a file in `src/pages/`. A file named `signups.astro`
becomes `/signups/`. Add it to the `nav` list in `site.js` so it appears in the
menu.

Photos go in `public/`. Two placeholder portraits are there now; replace them
with real photos and update the `photo` lines in `site.js`.

## Still to do

Search the project for `TODO` — every spot that needs your words is marked.
The main ones:

- Rewrite `our-story.md` and `support.md` properly
- Confirm the class list in `site.js`
- Add real team photos
- Connect the contact form (see below)
- Replace `contact.email` with the address you want published

## Contact form

The form needs a service to send mail, because a static site has no server.
[Formspree](https://formspree.io) has a free tier:

1. Sign up, create a form, copy the URL it gives you
2. Paste it into `formEndpoint` in `src/data/site.js`

Until you do, the contact page shows the email address instead of a form. That
is deliberate — a form that silently fails is worse than no form.

## Deploying

Push to GitHub, then connect the repo at [netlify.com](https://netlify.com).
Netlify detects Astro automatically; build command `npm run build`, publish
directory `dist`. Every push after that deploys itself.

Keep the WordPress site live until this one is finished and you have checked it
on a phone.

## Accessibility

The starting point covers keyboard focus outlines, alt text on images,
`prefers-reduced-motion`, and text that reflows down to a narrow phone screen.
If you add anything, keep those working — check by pressing Tab through a page
and making sure you can always see where you are.
