describe('Blog Operations', () => {
  const landingPage = 'http://localhost:5175/';

  beforeEach(() => {
    cy.visit(landingPage);
  });

  it('Creates a new blog post', () => {
    cy.contains('a', 'Create Post').click();
    cy.get('input[name="title"]').type('New Cypress Post');
    cy.get('div[contenteditable="true"]').type('This is a blog post created by Cypress testing.');
    cy.get('button[type="submit"]').click();

    cy.get('[data-notivue="success"]').should('exist');

    cy.url().should('eq', landingPage);

    cy.contains('New Cypress Post').should('exist');
  });

  it('Deletes a blog post', () => {
    cy.get('h2')
      .first()
      .invoke('text')
      .then((postTitle) => {
        cy.get('[aria-label="popover"]:first button').click();
        cy.get('[aria-label="Delete post"]').click();

        cy.get('[data-notivue="success"]').should('exist');

        cy.url().should('eq', landingPage);

        cy.contains(postTitle).should('not.exist');
      });
  });

  it('Updates an existing blog post', () => {
    cy.get('[aria-label="popover"]:first button').click();
    cy.get('[aria-label="Edit Post"]').click();

    cy.get('input[name="title"]').clear();
    cy.get('input[name="title"]').type('Updated Title');

    cy.get('div[contenteditable="true"]').clear();
    cy.get('div[contenteditable="true"]').type('Updated content.');

    cy.get('form').submit();

    cy.get('[data-notivue="success"]').should('exist');

    cy.url().should('eq', landingPage);

    cy.contains('Updated Title').should('exist');
  });

  it('Displays a blog post', () => {
    cy.get('h2')
      .first()
      .invoke('text')
      .then((postTitle) => {
        cy.contains('h2', postTitle).click();

        cy.url().should('include', '/posts/');

        cy.get('h2').should('contain.text', postTitle);
      });
  });
});
