# Code from HackaSoton's Backend Workshop

## Run locally

API:

```sh
cd api
npm ci
npm run dev
```

**Note: You will need mongo installed and running on your machine.**

Frontend:

```sh
cd react-project
npm ci
npm start
```

**Note: You will need the API running, otherwise the frontend will not work.**

## Deployment

API:

```sh
cd api
npm ci
npm run build
gcloud app deploy
```

**Note: You need to be authenticated to use `gcloud` commands. Try running `gcloud auth login`.**

Frontend:

```sh
cd react-project
npm ci
REACT_APP_API_URL="the url at which you deployed the api" npm run build
netlify deploy
```
