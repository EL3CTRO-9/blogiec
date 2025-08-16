export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve static asset from build/
    let res = await env.ASSETS.fetch(request);

    // If not found and path has no extension -> serve index.html so React Router can handle it
    if (
      res.status === 404 &&
      request.method === 'GET' &&
      !/\.[a-zA-Z0-9]+$/.test(url.pathname)
    ) {
      const indexReq = new Request(new URL('/index.html', url).toString(), request);
      res = await env.ASSETS.fetch(indexReq);
    }

    return res;
  },
};
