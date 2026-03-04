# Deployment Guide (Vercel + Render)

## 1) Backend on Render

- Deploy from `backend` using [render.yaml](render.yaml).
- Set secret env vars in Render dashboard:
  - `MONGO_URI`
  - `JWT_SECRET`
- Keep these values:
  - `NODE_ENV=production`
  - `COOKIE_SAMESITE=none`
  - `ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app`

## 2) Frontend on Vercel

- Deploy from `frontend` root.
- In [frontend/vercel.json](frontend/vercel.json), replace `https://your-backend.onrender.com` with your real Render backend URL.
- In Vercel environment variables, set:
  - `VITE_API_BASE_URL=https://your-backend.onrender.com`

## 3) Cookie + CSRF notes

- Cross-domain frontend/backend requires `COOKIE_SAMESITE=none` and HTTPS.
- CSRF token is issued at `/api/csrf-token` and sent via `x-csrf-token` on state-changing requests.
- CORS only allows origins listed in `ALLOWED_ORIGINS`.

## 4) Security checklist before production

- Rotate `JWT_SECRET` if it was ever exposed.
- Clear old auth cookies by logging out/in after deployment.
- Never print cookies/tokens in server logs.
- Verify `ALLOWED_ORIGINS` is exact (no wildcards in production).

## 5) Health checks

- Backend health endpoint: `/api/health`
- Render health check is preconfigured to use it.
