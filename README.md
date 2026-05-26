# Harper — NYC Exclusive Rental Platform
## Your Complete File Package

---

## What's in this folder

```
harper/
├── index.html              ← Landing page (homepage)
├── apply.html              ← Apply for access (renter onboarding)
├── browse.html             ← Member browse page (listings grid)
├── listing-detail.html     ← Individual listing page
├── landlord-listing.html   ← Landlord listing submission flow
├── renter-dashboard.html   ← Renter member dashboard
├── landlord-dashboard.html ← Landlord portal dashboard
└── css/
    └── harper.css           ← Shared styles (used by all pages)
```

---

## How to preview locally (before putting it online)

1. Open the `harper` folder on your computer
2. Double-click `index.html`
3. It will open in your browser — this is exactly what the site looks like
4. Click links to navigate between pages

> **Note:** Everything will work except the Tabler icons (the small icons throughout the site), which need an internet connection to load. If you're online, everything will look perfect.

---

## How to put this online (step by step)

### Step 1 — Create a GitHub account
Go to **github.com** and sign up for a free account.

### Step 2 — Create a new repository
- Click the green **"New"** button
- Name it `harper` (or anything you like)
- Make it **Public**
- Click **"Create repository"**

### Step 3 — Upload your files
- Click **"uploading an existing file"** link on the repository page
- Drag your entire `harper` folder contents into the upload area
  - Upload `index.html`, `apply.html`, `browse.html`, `listing-detail.html`, `landlord-listing.html`, `renter-dashboard.html`, `landlord-dashboard.html`
  - Then upload the `css` folder with `harper.css` inside
- Click **"Commit changes"**

### Step 4 — Create a Vercel account
Go to **vercel.com** and sign up for free using your GitHub account.

### Step 5 — Deploy
- Click **"Add New Project"**
- Select your `harper` repository from GitHub
- Click **"Deploy"**
- Wait about 60 seconds
- Vercel gives you a live URL like: `harper-nyc.vercel.app`

**That's it — your site is live.**

---

## How to get a custom domain (e.g. harperny.com)

1. Go to **namecheap.com** or **godaddy.com**
2. Search for your preferred domain name
3. Purchase it (typically $12–15/year)
4. In Vercel, go to your project → **Settings → Domains**
5. Add your custom domain and follow the instructions

---

## What a developer needs to do to make it fully functional

Hand this folder to a developer along with this list:

- **Database**: Store users, listings, messages, applications (recommend: Supabase or Firebase)
- **Authentication**: Login, signup, password reset, member-only page access
- **Income verification**: Integrate Plaid or Stripe Identity for the apply flow
- **File uploads**: Connect the photo upload in the landlord listing flow to cloud storage (recommend: Cloudinary or AWS S3)
- **Messaging**: Build real-time messaging between renters and landlords (recommend: Stream or Sendbird)
- **Email notifications**: Send emails when applications are approved, showings are confirmed, etc. (recommend: Resend or Sendgrid)
- **Admin panel**: A private page where you can approve/reject renter applications and listing submissions
- **Map view**: Connect the "View on map" button to Google Maps or Mapbox

---

## Design notes for your developer

- Font: Cormorant Garamond (display) + Jost (body) — both loaded from Google Fonts
- Icons: Tabler Icons (loaded via CDN — no installation needed)
- Brand color: `#A09070` (warm gold)
- All shared styles are in `css/harper.css` — do not duplicate styles in individual pages
- Each page links to the shared CSS file with: `<link rel="stylesheet" href="css/harper.css" />`
- All pages link to each other — navigation is already wired up

---

## Questions?

Continue your conversation with Claude to:
- Add more pages (e.g. a coming soon / waitlist page)
- Change colors, fonts, or layout
- Generate additional components
- Get help with the next steps

---

*Built with Claude · Harper NYC · 2026*
