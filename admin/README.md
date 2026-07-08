# Looks Saloon — Admin

Real-time management dashboard for Looks Saloon. Built with React, Vite, and Firebase
(Auth + Firestore). Deployed as a second Firebase Hosting site in the same project as
the main marketing site, so both share one Firestore database.

## Development

```bash
npm install
npm run dev
```

Requires the same `VITE_FIREBASE_*` environment variables as the main app (see the
repo root README). Only accounts listed in the Firestore `admins` collection can sign
in successfully — everyone else sees an "unauthorized" screen after login.

## Build

```bash
npm run build
```

## Deploy

Deployed automatically by `.github/workflows/firebase-deploy.yml` alongside the main
site, to the `looks-saloon-admin` Hosting site in the same Firebase project.
