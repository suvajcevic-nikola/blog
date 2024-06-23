describe("Add Main Flow", () => {
  it("Opens the Posts page, clicks on the first Blog Post, and mocks submitting the New Comment form.", () => {
    cy.visitHomePage();
    cy.checkElementExists('[data-testid="posts-grid"]');
    cy.clickFirstChild('[data-testid="posts-grid"]');
    cy.checkUrlIncludes("/post");
    cy.checkElementExists('[data-testid="post-article"]');
    cy.checkElementExists('[data-testid="new-comment-form"]');
    cy.typeIntoFormField(
      '[data-testid="new-comment-form"]',
      "input[name=name]",
      "Test Name",
    );
    cy.typeIntoFormField(
      '[data-testid="new-comment-form"]',
      "textarea[name=comment]",
      "Test Comment",
    );
    cy.checkElementExists("button[type=submit]");
    cy.log("New comment is submitted");
  });
});
