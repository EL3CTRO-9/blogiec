// src/utils/loadBlogs.js
export const loadBlogs = () => {
    const blogContext = require.context('../blogs', false, /\.js$/);
    // Map each blog file into an object including a slug (derived from file name)
    const blogs = blogContext.keys().map(key => {
      const blogModule = blogContext(key).default;
      return {
        ...blogModule,
        slug: key.replace('./', '').replace('.js', '')
      };
    });
    // Sort blogs by date descending (newest first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    return blogs;
  };
  