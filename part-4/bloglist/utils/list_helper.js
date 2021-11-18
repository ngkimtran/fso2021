const dummy = (blogs) => {
  return blogs.length === 0 ? 1 : blogs.length;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((b) => b.likes);
  return blogs.length === 0
    ? 'no favorite blog'
    : blogs[likes.indexOf(Math.max(...likes))];
};

const mostBlogs = (blogs) => {
  const authors = [...new Set(blogs.map((b) => b.author))]; //or use Array.from()
  const amounts = Array(authors.length).fill(0);
  blogs.map((b) => {
    authors.map((a) => {
      if (b.author === a) amounts[authors.indexOf(a)]++;
    });
  });
  const most = {
    author: authors[amounts.indexOf(Math.max(...amounts))],
    blogs: Math.max(...amounts),
  };

  return blogs.length === 0 ? 'no author with most blogs' : most;
};

const mostLikes = (blogs) => {
  const authors = [...new Set(blogs.map((b) => b.author))]; //or use Array.from()
  const likes = Array(authors.length).fill(0);
  blogs.map((b) => {
    authors.map((a) => {
      if (b.author === a) likes[authors.indexOf(a)] += b.likes;
    });
  });
  const most = {
    author: authors[likes.indexOf(Math.max(...likes))],
    likes: Math.max(...likes),
  };

  return blogs.length === 0 ? 'no author with most likes' : most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
