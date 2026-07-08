# Looks Saloon

Marketing website for Looks Saloon — a hair, skin, and nail care salon. Built with React and Vite, deployed to Firebase Hosting.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Deploys to Firebase Hosting automatically on every push to `main` via the
`.github/workflows/firebase-deploy.yml` GitHub Actions workflow, using the
`FIREBASE_TOKEN` repository secret. You can also trigger a deploy manually
from the Actions tab (`workflow_dispatch`).

To deploy locally instead:

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy --only hosting
```

The Firebase project id is configured in `.firebaserc` (`looks-saloon`).
