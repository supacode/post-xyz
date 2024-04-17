describe('Blog Operations', () => {
  const landingPage = 'http://localhost:5173/';
  const blogServiceUri = 'https://jsonplaceholder.typicode.com/posts';

  beforeEach(() => {
    cy.visit(landingPage);
  });

  it('Creates a new blog post', () => {
    cy.intercept('POST', blogServiceUri, {
      statusCode: 201,
      body: {
        id: 124,
        title: 'new post',
        content: 'new post content',
      },
    }).as('createPost');
    cy.contains('a', 'Create Post').click();
    cy.get('input[name="title"]').type('New Cypress Post');
    cy.get('div[contenteditable="true"]').type('This is a blog post created by Cypress testing.');
    cy.get('button[type="submit"]').click();
    cy.wait('@createPost');
    cy.get('[data-notivue="success"]').should('exist');
  });

  it('Deletes a blog post', () => {
    cy.intercept('DELETE', `${blogServiceUri}/*`, {
      statusCode: 200,
      body: { message: 'Post deleted successfully' },
    }).as('deletePost');

    cy.get('[aria-label="popover"]:first button').click();
    cy.get('[aria-label="Delete post"]').click();
    cy.wait('@deletePost');
    cy.get('[data-notivue="success"]').should('exist');
  });

  it('Updates an existing blog post', () => {
    cy.intercept('PATCH', `${blogServiceUri}/*`, {
      statusCode: 200,
      body: {
        id: 1,
        title: 'new post',
        content: 'new post content',
      },
    }).as('updatePost');

    cy.get('[aria-label="popover"]:first button').click();
    cy.get('[aria-label="Edit Post"]').click();

    cy.get('input[name="title"]').clear();
    cy.get('input[name="title"]').type('Updated Title');

    cy.get('div[contenteditable="true"]').clear();
    cy.get('div[contenteditable="true"]').type('Updated content.');

    cy.get('form').submit();
    cy.wait('@updatePost');
    cy.get('[data-notivue="success"]').should('exist');
  });

  it('Displays a blog post', () => {
    cy.intercept('GET', `${blogServiceUri}/1`, {
      statusCode: 200,
      body: { id: 1, title: 'abc', body: 'abc content' },
    }).as('getPost');

    cy.visit(`${landingPage}posts/1`);

    cy.wait('@getPost');

    cy.get('h2').should('have.text', 'abc');
    cy.get('div[title="abc"]').should('have.text', 'abc content');
  });
});
