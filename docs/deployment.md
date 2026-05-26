# Deployment

Critical Path Mapper is deployed as a static Vite app under the public projects host.

## Public URLs

- Projects hub: `https://projects.danielmardis.com/`
- Critical Path Mapper: `https://projects.danielmardis.com/critical-path-mapper/`

## Hosting target

The app is served by Caddy from the VPS at:

```text
/var/www/projects/critical-path-mapper/
```

The projects landing page is served from:

```text
/var/www/projects/index.html
```

## DNS

`projects.danielmardis.com` points to the VPS:

```text
157.180.120.134
```

Verification:

```bash
dig +short projects.danielmardis.com
```

Expected:

```text
157.180.120.134
```

## Caddy configuration

Caddy serves the static project root with automatic HTTPS.

Expected site block:

```caddyfile
projects.danielmardis.com {
    root * /var/www/projects
    encode zstd gzip
    file_server
}
```

Before changing Caddy config, always back up the file and validate before reload:

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak-$(date +%Y%m%d-%H%M%S)
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl status caddy --no-pager
```

Use `reload`, not restart, unless there is a specific reason to restart.

## Vite base path

Because the app is served from a subpath, Vite must build assets relative to `/critical-path-mapper/`.

`vite.config.ts` should include:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/critical-path-mapper/',
  plugins: [react()],
});
```

If this base path is missing, the app may load a blank page or request assets from `/assets/` instead of `/critical-path-mapper/assets/`.

## VPS Node version note

The VPS global Node version is currently older than the version required by modern Vite builds.

Observed failure:

```text
You are using Node.js 18.19.1. Vite requires Node.js version 20.19+ or 22.12+.
ReferenceError: CustomEvent is not defined
```

Do not upgrade global Node casually, because other services may depend on the current Node runtime.

Preferred approach:

> Build in an isolated Docker Node environment, then deploy only the static `dist/` output.

## Recommended build method

Use Docker with Node 22:

```bash
rm -rf /tmp/critical-path-mapper-build
git clone https://github.com/danmardis/critical-path-mapper.git /tmp/critical-path-mapper-build
cd /tmp/critical-path-mapper-build
git log -1 --oneline

docker run --rm \
  -v "$PWD":/app \
  -w /app \
  node:22-bookworm \
  bash -lc "npm install && npm run build"
```

This keeps the VPS global Node version untouched.

## Deploy static build

After a successful build:

```bash
sudo mkdir -p /var/www/projects/critical-path-mapper
sudo rsync -av --delete dist/ /var/www/projects/critical-path-mapper/
sudo chown -R root:www-data /var/www/projects
sudo chmod -R 755 /var/www/projects
```

## Smoke tests

Run these after deployment:

```bash
curl -I https://projects.danielmardis.com/
curl -I https://projects.danielmardis.com/critical-path-mapper/
curl -fsS https://projects.danielmardis.com/critical-path-mapper/ | head -80
```

Success indicators:

- Projects hub returns HTTP 200.
- Critical Path Mapper returns HTTP 200.
- The app shell references assets under `/critical-path-mapper/assets/`.

Expected asset shape:

```text
/critical-path-mapper/assets/index-*.js
/critical-path-mapper/assets/index-*.css
```

## Current deployment record

Initial deployment completed successfully using:

- Isolated Docker build with `node:22-bookworm`.
- Repo clone verified at commit `3df75cf`.
- Vite base path set to `/critical-path-mapper/`.
- Static build deployed to `/var/www/projects/critical-path-mapper/`.
- Caddy remained healthy.
- Existing services were untouched apart from serving the new static files.

Built files at deployment time:

```text
dist/index.html
dist/assets/index-BQLoOrS8.js
dist/assets/index-BfhPFgJ3.css
```

Verified public URLs:

- `https://projects.danielmardis.com/`
- `https://projects.danielmardis.com/critical-path-mapper/`

## Deployment principle

Keep this app simple:

- static build,
- Caddy file server,
- Docker-only build environment,
- no global Node changes,
- no backend until the MVP earns it.

The app should stay a sharp little planning tool, not a server garden with vines.