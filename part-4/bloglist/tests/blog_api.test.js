const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('../utils/test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const login = async () => {
  const result = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });
  return result.body.token;
};

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });
  await user.save();

  const userToAdd = await User.findOne({ username: 'root' });

  await Blog.deleteMany({});
  for (const b of helper.initialBlogs) {
    const blog = new Blog({ ...b, user: userToAdd.id });
    await blog.save();
  }
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    const token = await login();

    await api
      .get('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const token = await login();
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: 'bearer ' + token });
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const token = await login();
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: 'bearer ' + token });
    const titles = response.body.map((r) => r.title);

    expect(titles).toContain('TDD harms architecture');
  });
});

describe('verify id property', () => {
  test('is unique and defined', async () => {
    const token = await login();

    const response = await api
      .get('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const ids = response.body.map((r) => r.id);
    const isArrayUnique = (arr) =>
      Array.isArray(arr) && new Set(arr).size === arr.length;

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
    expect(isArrayUnique(ids)).toBeTruthy();
  });
});

describe('adding a blog', () => {
  test('succeeds with valid data', async () => {
    const token = await login();
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api
      .get('/api/blogs')
      .set({ Authorization: 'bearer ' + token });

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test('fails with status code 400 if title and url are missing', async () => {
    const token = await login();
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails with status code 401 if no token is provided', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

describe('adding a blog with missing likes value', () => {
  test('succeeds and defaults likes value to 0', async () => {
    const token = await login();
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api
      .get('/api/blogs')
      .set({ Authorization: 'bearer ' + token });

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(response.body[helper.initialBlogs.length].likes).toBe(0);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const token = await login();
    const blogsBefore = await helper.blogsInDb();
    const blogToDelete = blogsBefore[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(204);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAfter.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('succeeds with status code 200 if data is valid', async () => {
    const token = await login();
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const update = {
      likes: 50,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: 'bearer ' + token })
      .send(update)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedBlog = await api
      .get(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: 'bearer ' + token });

    expect(updatedBlog.body).toEqual(expect.objectContaining(update));
  });

  test('fails with statuscode 500 if blog does not exist', async () => {
    const token = await login();
    const validNonexistingId = await helper.nonExistingId();
    const update = {
      likes: 50,
    };

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .set({ Authorization: 'bearer ' + token })
      .send(update)
      .expect(500);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const token = await login();
    const invalidId = '5a3d5da59070081a82a3445';
    const update = {
      likes: 50,
    };

    await api
      .put(`/api/blogs/${invalidId}`)
      .set({ Authorization: 'bearer ' + token })
      .send(update)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
