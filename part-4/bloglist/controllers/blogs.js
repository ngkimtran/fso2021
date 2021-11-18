const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const data = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(data.map((b) => b.toJSON()));
});

blogsRouter.get('/:id', async (request, response) => {
  const data = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });
  if (data) {
    response.json(data.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  const data = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await data.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response
      .status(401)
      .json({ error: "You don't have permission to delete this blog." })
      .end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const person = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
