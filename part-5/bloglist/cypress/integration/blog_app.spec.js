describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      notes: [],
      username: 'testing',
      name: 'Testuser',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testing');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
      cy.contains('Testuser logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test1');
      cy.get('#password').type('test1');
      cy.get('#login-button').click();
      cy.get('.error')
        .contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Testuser logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testing', password: 'test' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('https://www.cypress.io/');
      cy.contains('add').click();
      cy.contains('a blog created by cypress');
    });

    describe('and a blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'test',
          url: 'http://test.com',
          likes: 0,
        });
      });

      it('users can like it', function () {
        cy.get('.blog').contains('view').click();
        cy.get('.blog').get('#like').click();
        cy.get('.blog-details').contains(1);
      });

      it('users can delete it', function () {
        cy.get('.blog').contains('view').click();
        cy.get('.blog').get('#remove').click();
        cy.get('html').should('not.contain', 'first blog');
      });
    });

    describe('and many blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'test',
          url: 'http://test.com',
          likes: 15,
        });
        cy.createBlog({
          title: 'second blog',
          author: 'test',
          url: 'http://test.com',
          likes: 5,
        });
        cy.createBlog({
          title: 'third blog',
          author: 'test',
          url: 'http://test.com',
          likes: 10,
        });
      });

      it('blogs are ordered according to likes', function () {
        cy.get('.blogs').then(($elements) => {
          let blogs = $elements.map(($el) => $el);
          cy.wrap(blogs).should(
            'equal',
            blogs.sort((a, b) => b.likes - a.likes)
          );
        });
      });
    });
  });
});
