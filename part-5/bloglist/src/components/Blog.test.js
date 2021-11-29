import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import CreateBlog from './CreateBlog';

describe('A Blog component', () => {
  let component;
  const mockHandler = jest.fn();
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 811113,
    user: {
      username: 'test',
      name: 'Superuser',
      id: '6193ad8a61fde482ad4d1b29',
    },
    id: '6193b32bf539c6e010843556',
  };
  const user = {
    username: 'test',
    name: 'Superuser',
  };

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} handleLikes={mockHandler} />
    );
  });

  describe('displaying by default', () => {
    test('renders title and author', () => {
      const div = component.container.querySelector('.blog');
      expect(div).toHaveTextContent('React patterns');
      expect(div).toHaveTextContent('Michael Chan');
    });
    test('does not render url and likes', () => {
      const div = component.container.querySelector('.blog-details');
      expect(div).toHaveStyle('display: none');
    });
  });

  describe('clicking the button controlling details', () => {
    test('renders url and likes', () => {
      const button = component.getByText('view');
      fireEvent.click(button);

      const div = component.container.querySelector('.blog-details');
      expect(div).not.toHaveStyle('display: none');
      expect(div).toHaveTextContent('https://reactpatterns.com/');
      expect(div).toHaveTextContent(811113);
    });
  });

  describe('clicking the like button 2 times', () => {
    test('calls event handler twice', () => {
      const button = component.getByText('like');
      fireEvent.click(button);
      fireEvent.click(button);

      const div = component.container.querySelector('.blog-details');
      expect(mockHandler.mock.calls).toHaveLength(2);
      expect(div).toHaveTextContent(811115);
    });
  });
});

describe('A CreateBlog component', () => {
  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <CreateBlog createBlog={mockHandler} createBlogRef={mockHandler} />
    );
  });

  test('updates state and calls onSubmit', () => {
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('#blog-form');

    fireEvent.change(title, { target: { value: 'React patterns' } });
    fireEvent.change(author, { target: { value: 'Michael Chan' } });
    fireEvent.change(url, { target: { value: 'https://reactpatterns.com/' } });
    fireEvent.submit(form);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    });
  });
});
