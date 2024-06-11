describe("Add Main Flow", () => {
  it("Opens the Posts page, clicks on the first Blog Post, and mocks submitting the New Comment form.", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test="posts-grid"]').should("exist");
    cy.get('[data-test="posts-grid"] > :nth-child(1)').click();
    cy.url().should("include", "/post");
    cy.get('[data-test="post-article"]').should("exist");
    cy.get('[data-test="new-comment-form"]').should("exist");
    cy.get('[data-test="new-comment-form"]')
      .get("input[name=name]")
      .type("Test Name");
    cy.get('[data-test="new-comment-form"]')
      .get("textarea[name=comment]")
      .type("Test Comment");
    cy.get("button[type=submit]").should("exist");
    cy.log("New comment is submitted");
  });
});
