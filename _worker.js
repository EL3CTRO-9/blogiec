// _worker.js
export default {
  async fetch(request, env) {
    // Try serving a static asset from build/
    let res = await env.ASSETS.fetch(request);

    // If not found, and it's a GET, serve index.html for SPA routes
    if (res.status === 404 && request.method === 'GET') {
      const url = new URL(request.url);

      // If it's clearly an asset (file extension), return 404
      if (/\.[a-z0-9]+$/i.test(url.pathname)) {
        return res;
      }

      // Otherwise, return index.html so React Router can render it
      return env.ASSETS.fetch(new Request(url.origin + '/index.html', request));
    }

    return res;
  }
}
