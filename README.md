# Looks Saloon

Marketing website for Looks Saloon — a hair, skin, and nail care salon. Built with
React and Vite, deployed to Firebase Hosting, backed by Firestore for real-time
bookings and content.

A companion admin dashboard lives in [`admin/`](./admin) — same Firebase project,
separate Hosting site — for managing bookings, services, testimonials, and studio
info in real time.

## Development

```bash
npm install
npm run dev
```

The site works without Firebase configured (bookings/services/testimonials just fall
back to built-in defaults). To connect it to Firestore locally, create a `.env`
file with:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Build

```bash
npm run build
```

## Deploy

Deploys to Firebase Hosting automatically on every push to `main` via
`.github/workflows/firebase-deploy.yml`, using the `FIREBASE_TOKEN` repository
secret. The workflow also builds and deploys the `admin/` dashboard to a second
Hosting site in the same project, and deploys Firestore security rules. You can
trigger a deploy manually from the Actions tab (`workflow_dispatch`).

To deploy locally instead:

```bash
npm install -g firebase-tools
firebase login
npm run build && (cd admin && npm run build)
firebase deploy
```

## Firebase project layout

- **Project**: `looks-saloon`
- **Hosting sites**: `looks-saloon` (main site) and `looks-saloon-admin` (admin
  dashboard) — see `.firebaserc` for the target mapping.
- **Firestore collections**: `bookings`, `services`, `testimonials`, `settings`
  (business info), `admins` (allow-list of UIDs with dashboard access).
- **Security**: `firestore.rules` lets anyone submit a booking, lets anyone read
  services/testimonials/settings, and restricts all other reads/writes to UIDs
  listed in `admins`.

### One-time admin access setup

The admin dashboard requires Firebase Authentication (Email/Password) plus an
`admins/{uid}` Firestore document — this is not automated by CI, since creating
login credentials automatically isn't something a deploy pipeline should do
silently. To grant yourself access:

1. Firebase Console → **Authentication** → **Sign-in method** → enable
   **Email/Password**.
2. **Authentication** → **Users** → **Add user** → enter your email and a
   password you choose.
3. Copy that user's **User UID** from the Users table.
4. **Firestore Database** → **Start collection** → collection ID `admins` →
   document ID = the UID you copied → add any field (e.g. `role: "owner"`) →
   Save.

Sign in at the admin URL with that email/password. Any additional teammate can be
granted access the same way (add their Firebase Auth user, add their UID to
`admins`).
